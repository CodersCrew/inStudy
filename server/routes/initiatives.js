import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';

import FetchInitiative from '../services/FetchInitiative';
import { sendInitiativeImage, removeImage, sendModuleImage } from '../services/Cloudinary';
import cacher from '../services/cacher/index';
import createNewInitiative from '../services/createNewInitiative';
import { userLogged, permissionGranted } from './validators/auth';
import { MODIFY_INITIATIVE } from './validators/consts';
import { inviteUserValidators, invitationResponse } from './validators/initiative-validators';
import mailSender, { INVITE_EMAIL, INITIATIVE_CONTACT_EMAIL, RESTORE_ACCOUNT } from '../services/mail-sender';
import config from '../config/keys';
import { changeBasicInitiativeData } from '../services/FetchInitiative';

const { searchInitiative } = require('./../services/search');

const Initiative = mongoose.model('initiatives');
const Member = mongoose.model('member');
const User = mongoose.model('users');

module.exports = (app) => {
  app.get('/api/initiative', async (req, res) => {
    const { page, query } = req.query;

    if (query && query.length) {
      searchInitiative(query)
        .then((result) => {
          res
            .status(200)
            .json(result);
        });
    } else {
      new FetchInitiative()
        .getShortInitiativeProfile(page)
        .then(async (foundInitiatives) => {
          res.status(200).json(await Promise.all(foundInitiatives));
        })
        .catch(() => {
          res.sendStatus(404);
        });
    }
  });

  app.post('/api/initiative', userLogged, (req, res) => {
    const initiative = req.body;
    createNewInitiative(initiative, req.user)
      .then((result) => {
        res.status(200).json({ result });
      })
      .catch((err) => {
        console.log(err)
        if (err === 'ITEM_EXIST') {
          res.sendStatus(409);
        }
      });
  });

  app.get('/api/restore', async (req, res) => {
    const { token } = req.query;

    const { userId, initiativeId } = jsonwebtoken.verify(token, config.cookieKey);
    const initiative = await Initiative.findById(initiativeId);

    if (userId && initiativeId) {
      const newMember = new Member({
        user: new mongoose.mongo.ObjectId(userId),
        role: 'admin',
        roleDescription: `Członek inicjatywy "${initiative.name}" działającej na uczelni ${initiative.university}, obszarze ${initiative.category}`,
      });

      await Initiative.findByIdAndUpdate(initiativeId, {
        $addToSet: {
          members: newMember,
        },
      });
      await User.findByIdAndUpdate(userId, {
        $addToSet: {
          initiatives: new mongoose.mongo.ObjectId(initiativeId),
        },
      });
    }

    res.redirect(`${config.HOST}/student/profil`);
  });

  app.post('/api/initiative/restore', async (req, res) => {
    const { email } = req.body;
    const { _id: userId } = req.user;
    // const userId = '5ba662f121f43e0717efcdbd';
    const newInitiative = await Initiative.findOne({ email });

    if (newInitiative) {
      const token = jsonwebtoken.sign({ userId, initiativeId: newInitiative._id }, config.cookieKey);
      await mailSender(email, RESTORE_ACCOUNT, { token });
    }

    res.sendStatus(201);
  });

  app.put('/api/initiative/basic', userLogged, (req, res) => {
    const basic = req.body;
    const { initiativeId } = req.body;

    sendInitiativeImage(req.body.image)(initiativeId)
      .then(({ secure_url }) => {
        changeBasicInitiativeData({ ...basic, image: secure_url }, initiativeId)
          .then(() => res.sendStatus(201))
          .catch((error) => {
            console.error(error);
            res.sendStatus(404);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  });

  app.get('/api/initiative/search', async (req, res) => {
    const { query } = req.query;
    const result = await searchInitiative(query);

    res.status(200).json(result);
  });

  app.get('/api/initiative/:shortUrl', (req, res) => {
    const { shortUrl } = req.params;

    new FetchInitiative()
      .getSingleInitiative(shortUrl)
      .then((initiative) => {
        res.status(200).json(initiative);
      })
      .catch((err) => {
        if (err === 'NOT_FOUND') {
          res.sendStatus(404);
        } else {
          console.error(err);
        }
      });
  });

  app.post('/api/initiative/:initId/module', userLogged, async (req, res) => {
    const { initId } = req.params;
    const module = req.body;

    if (module?.content?.items) {
      const parsedContent = module.content.items.map(async (singleItem) => {
        if (singleItem.image) {
          const { secure_url } = await sendModuleImage(singleItem.image)(initId);
          singleItem.image = secure_url;
        }

        if (singleItem.images) {
          const images = singleItem.images.map(async (item) => {
            if (item.image) {
              const { secure_url } = await sendModuleImage(item.image)(initId);
              item.image = secure_url;
            }
            return item;
          });

          singleItem.images = await Promise.all(images);
        }

        return singleItem;
      });

      module.content.items = await Promise.all(parsedContent);
    }


    new FetchInitiative().addInitiativeModule(initId, module).then(() => {
      // req.instudyCache = module;
      res.status(200).json(module);
    });
  },
  cacher);

  app.get('/api/initiative/:initId/module', cacher, (req, res) => {
    const { initId } = req.params;

    new FetchInitiative().getAllModules(initId).then((modules) => {
      res.status(200).json(modules);
    });
  });

  app.post('/api/initiative/:initId/send-message', async (req, res) => {
    const { initId } = req.params;
    const emailParams = req.body;
    const { email } = await Initiative.findById(initId);

    mailSender(email, INITIATIVE_CONTACT_EMAIL, emailParams)
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500));
  });

  app.put('/api/initiative/:initId/module/:modId', (req, res) => {
    const { initId } = req.params;
    const { modId } = req.params;
    const module = req.body;

    new FetchInitiative()
      .updateModule(module, initId, modId)
      .then(updatedModule => res.status(200).json(updatedModule))
      .catch(err => console.error(err));
  });

  app.delete('/api/initiative/:initId/module/:modId', userLogged, async (req, res) => {
    const { initId } = req.params;
    const { modId } = req.params;

    Initiative.findById(initId).lean()
      .then(async (initiative) => {
        const module = initiative.modules.find(module => module._id.toString() === modId);

        if (module?.content?.items) {
          const parsedContent = module.content.items.map(async (singleItem) => {
            if (singleItem.image) {
              const public_id = new RegExp('image\\/upload\\/[A-Za-z0-9]+\\/([A-Za-z0-9]+\\/modules\\/[A-Za-z0-9]+)').exec(singleItem.image)[1];
              await removeImage(public_id);
            }

            if (singleItem.images) {
              const images = singleItem.images.map(async (item) => {
                if (item.image) {
                  const public_id = new RegExp('image\\/upload\\/[A-Za-z0-9]+\\/([A-Za-z0-9]+\\/modules\\/[A-Za-z0-9]+)').exec(item.image)[1];
                  await removeImage(public_id);
                }
                return item;
              });

              singleItem.images = await Promise.all(images);
            }

            return singleItem;
          });

          await Promise.all(parsedContent);
        }
      })
      .then(() => {
        new FetchInitiative().deleteModule(initId, modId).then(() => { // TODO: kasowanie modułu powinno kasować zdjecia na cloudinary
          res.sendStatus(201);
        });
      });
  });

  app.post('/api/initiative/:initId/module/reorder', userLogged, (req, res) => {
    const { initId } = req.params;
    const modules = req.body;

    // TODO: kasowanie modułu powinno kasować zdjecia na cloudinary
    new FetchInitiative().reorderModules(initId, modules).then(() => {
      res.sendStatus(201);
    });
  });

  app.delete('/api/initiative/:initId', (req, res) => {
    const initId = req.params.initId;

    new FetchInitiative().deleteInitiative(initId).then(() => {
      res.sendStatus(200);
    });
  });

  app.post('/api/initiative/:initId/invite', inviteUserValidators, (req, res) => {
    const { email } = req.body;
    mailSender(email, INVITE_EMAIL, { initiativeID: req.params.initId })
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500));
  });

  app.get('/api/invite', invitationResponse, (req, res) => {
    const { jwt } = req.query;

    const { initiativeID } = jsonwebtoken.verify(jwt, config.cookieKey);
    const { user } = req;
    new FetchInitiative()
      .assignInitiative(user._id, initiativeID)
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500));
  });
};
