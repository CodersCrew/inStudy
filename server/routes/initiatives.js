import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';

import FetchInitiative, { getShortInitiativeProfile } from './../services/FetchInitiative';
import { sendInitiativeImage, removeImage, sendModuleImage } from './../services/Cloudinary';
import cacher from '../services/cacher/index';
import createNewInitiative from './../services/createNewInitiative';
import { userLogged, permissionGranted } from './validators/auth';
import { MODIFY_INITIATIVE } from './validators/consts';
import { inviteUserValidators, invitationResponse } from './validators/initiative-validators';
import mailSender, { INVITE_EMAIL, INITIATIVE_CONTACT_EMAIL, RESTORE_ACCOUNT } from './../services/mail-sender';
import config from '../config/keys';
import { changeBasicInitiativeData } from './../services/FetchInitiative';
const { searchInitiative } = require('./../services/search');
const Initiative = mongoose.model('initiatives');
const Member = mongoose.model('member');
const User = mongoose.model('users');
import roles, { ADMIN } from './../services/roles';
const to = require('./../utils/to');
const { initiativeDebug } = require('./../utils/debug');

module.exports = app => {
  app.get('/api/initiative', async (req, res) => {
    const { page, count, query } = req.query;

    const [err, initiatives] = await to(getShortInitiativeProfile(page, count, query));
    initiativeDebug(req.query, [err, initiatives]);

    if (err) return res.sendStatus(404);
    return res.status(200).json(initiatives);
  });

  app.post('/api/initiative', userLogged, async (req, res) => {
    const initiativeInput = req.body;
    const { user } = req;

    const [err, initiative] = await to(createNewInitiative(initiativeInput, user));
    initiativeDebug(initiativeInput, [err, initiative]);

    if (err) return res.sendStatus(409);

    return res.status(200).json({ result: initiative });
  });

  app.get('/api/restore', async (req, res) => {
    const { token } = req.query;

    const { userId, initiativeId } = jsonwebtoken.verify(token, config.cookieKey);

    let [err, initiative] = await to(Initiative.findById(initiativeId));

    if (err) return res.sendStatus(500);

    if (userId && initiativeId) {
      const newMember = new Member(roles(userId, ADMIN, initiative));
      [err] = await to(Initiative.findByIdAndUpdate(initiativeId, {
        $addToSet: {
          members: newMember,
        }
      }));

      if (err) return res.sendStatus(500);

      [err] = await to(User.findByIdAndUpdate(userId, {
        $addToSet: {
          initiatives: new mongoose.mongo.ObjectId(initiativeId),
        }
      }));

      if (err) return res.sendStatus(500);
    }

    initiativeDebug(req.query, 'void');

    res.redirect(`${config.HOST}/student/profil`);

  });

  app.post('/api/initiative/restore', async (req, res) => {
    const { email } = req.body;
    const { _id: userId } = req.user;
    // const userId = '5ba662f121f43e0717efcdbd';
    const newInitiative = await Initiative.findOne({ email });

    if (newInitiative) {
      const token = jsonwebtoken.sign({ userId, initiativeId: newInitiative._id }, config.cookieKey);
      await mailSender(email, RESTORE_ACCOUNT, { token })
    }

    res.sendStatus(201);
  });

  app.put('/api/initiative/basic', userLogged, (req, res) => {
    const basic = req.body;
    const { _id } = req.user;
    const { initiativeId } = req.body;

    sendInitiativeImage(req.body.image)(_id)
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

      if ( module?.content?.items) {
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
    cacher,
  );

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
      .catch(() => res.sendStatus(500))

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
      .then( async initiative => {
        const module = initiative.modules.find(module => module._id.toString() === modId)

        if (module?.content?.items) {
          const parsedContent = module.content.items.map(async (singleItem) => {
            if (singleItem.image) {
              const public_id = new RegExp('image\\/upload\\/[A-Za-z0-9]+\\/([A-Za-z0-9]+\\/modules\\/[A-Za-z0-9]+)').exec(singleItem.image)[1]
              await removeImage(public_id);
            }

            if (singleItem.images) {
              const images = singleItem.images.map(async (item) => {
                if (item.image) {
                  const public_id = new RegExp('image\\/upload\\/[A-Za-z0-9]+\\/([A-Za-z0-9]+\\/modules\\/[A-Za-z0-9]+)').exec(item.image)[1]
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
        new FetchInitiative().deleteModule(initId, modId).then(() => { //TODO: kasowanie modułu powinno kasować zdjecia na cloudinary
          res.sendStatus(201);
        });
      })
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

  app.post('/api/initiative/:shortUrl/fetch', (req, res) => {
    const { shortUrl } = req.params;

    new FetchInitiative()
      .getFBProfile(shortUrl)
      .then(result => new FetchInitiative().setFBProfile(shortUrl, result))
      .then(() => res.sendStatus(201));
  });

  app.post('/api/initiative/:initId/invite', inviteUserValidators, (req, res) => {
    const { email } = req.body;

    mailSender(email, INVITE_EMAIL, { initiativeID: req.params.initId })
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500));
  });

  app.get('/api/invite', invitationResponse, (req, res) => {//TODO: zmienic mechanike zapraszania
    const { jwt } = req.query;

    const { initiativeID } = jsonwebtoken.verify(jwt, config.cookieKey);
    const { user } = req;
    new FetchInitiative()
      .assignInitiative(user._id, initiativeID)
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500));
  });
};
