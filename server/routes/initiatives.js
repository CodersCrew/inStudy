import FetchInitiative from './../services/FetchInitiative';
import multer from 'multer';
import path from 'path';
import Cloudinary, { sendInitiativeImage, sendUserImage } from './../services/Cloudinary';
import cacher from '../services/cacher/index';
import createNewInitiative from './../services/createNewInitiative';
import { userLogged, permissionGranted } from './validators/auth';
import { MODIFY_INITIATIVE } from './validators/consts';
import { inviteUserValidators, invitationResponse } from './validators/initiative-validators';
import mailSender, { INVITE_EMAIL, INITIATIVE_CONTACT_EMAIL } from './../services/mail-sender';
import config from '../config/keys';
import jsonwebtoken from 'jsonwebtoken';
import { changeBasicInitiativeData } from './../services/FetchInitiative';
import mongoose from 'mongoose';
const Initiative = mongoose.model('initiatives');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ dest: 'uploads/', storage });
// const upload = multer({ dest: 'uploads/' });

module.exports = app => {
  app.get('/api/initiative', async (req, res) => {
    const { page } = req.query;
    new FetchInitiative()
      .getShortInitiativeProfile(page)
      .then( async foundInitiatives => {
        res.status(200).json(await Promise.all(foundInitiatives));
      })
      .catch(() => {
        res.sendStatus(404);
      });
  });

  app.post('/api/initiative', userLogged, (req, res) => {
    const initiative = req.body;
    createNewInitiative(initiative, req.user)
      .then(result => {
        res.status(200).json({ result });
      })
      .catch(err => {
        if (err === 'ITEM_EXIST') {
          res.sendStatus(409);
        }
      });
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

  app.get('/api/initiative/:shortUrl', (req, res) => {
    const { shortUrl } = req.params;

    new FetchInitiative()
      .getSingleInitiative(shortUrl)
      .then((initiative) => {
        res.status(200).json(initiative);
      })
      .catch(err => {
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

      if( module?.content?.items) {
        const parsedContent = module.content.items.map(async (singleItem) => {
          if (singleItem.image) {
            const { secure_url } = await sendInitiativeImage(singleItem.image)(initId);
            singleItem.image = secure_url;
          }

          if (singleItem.images) {
            const images = singleItem.images.map(async (item) => {
              if (item.image) {
                const { secure_url } = await sendInitiativeImage(item.image)(initId);
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
    const initId = req.params.initId;

    new FetchInitiative().getAllModules(initId).then(modules => {
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
    const initId = req.params.initId;
    const modId = req.params.modId;
    const module = req.body;

    new FetchInitiative()
      .updateModule(module, initId, modId)
      .then(updatedModule => res.status(200).json(updatedModule))
      .catch(err => console.error(err));
  });

  app.delete('/api/initiative/:initId/module/:modId', userLogged, (req, res) => {
    const initId = req.params.initId;
    const modId = req.params.modId;

    new FetchInitiative().deleteModule(initId, modId).then(() => { //TODO: kasowanie modułu powinno kasować zdjecia na cloudinary
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
    const shortUrl = req.params.shortUrl;
    new FetchInitiative()
      .getFBProfile(shortUrl)
      .then(result => new FetchInitiative().setFBProfile(shortUrl, result))
      .then(() => res.sendStatus(201));
  });

  app.post('/api/initiative/:initId/invite', inviteUserValidators, (req, res) => {
    const { email } = req.body;
    mailSender(email, INVITE_EMAIL, { initiativeID: req.params.initId})
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500));

  })

  app.get('/api/invite', invitationResponse, (req, res) => {
    const { jwt } = req.query;

    const { initiativeID } = jsonwebtoken.verify(jwt, config.cookieKey);
    const { user } = req;
    new FetchInitiative()
      .assignInitiative(user._id, initiativeID)
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500));
  })
};
