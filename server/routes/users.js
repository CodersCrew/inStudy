import { addNewModule, changeBasicUserData, updateModule, deleteModule, getUserData } from '../services/fetchUser';
import { createModuleValidators } from './validators/user-validators';
import { userLogged } from './validators/auth';
const fs = require('fs');
import path from 'path';
import { sendInitiativeImage, sendUserImage } from '../services/Cloudinary';
import mailSender, { INITIATIVE_CONTACT_EMAIL } from '../services/mail-sender';
import mongoose from 'mongoose';
const User = mongoose.model('users');

module.exports = (app) => {
  app.get('/api/user/:userId', (req, res) => {
    const { userId } = req.params;

    getUserData(userId)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((errorName) => {
        if (errorName === 'CastError') {
          res.sendStatus(404);
        }
        console.error(errorName);
      });
  });

  app.post('/api/user/:userId/send-message', async (req, res) => {
    const { userId } = req.params;

    const emailParams = req.body;
    const { email } = await User.findById(userId);

    mailSender(email, INITIATIVE_CONTACT_EMAIL, emailParams)
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500))
  });

  //wysylanie zdjec, rejestracja inicjatywy - scrapper, maile, validator
  app.post('/api/user/module', async (req, res) => {
    const module = req.body;
    const { _id: userId } = req.user;

    try {
      if( module?.content?.items) {
        const parsedContent = module.content.items.map(async (singleItem) => {
          if (singleItem.image) {
            const { secure_url } = await sendUserImage(singleItem.image)(userId);
            singleItem.image = secure_url;
          }

          if (singleItem.images) {
            const images = singleItem.images.map(async (item) => {
              if (item.image) {
                const { secure_url } = await sendUserImage(item.image)(userId);
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

      addNewModule(module, userId)
        .then(() => res.sendStatus(201))
        .catch((error) => {
          console.error(error);
          res.sendStatus(404);
        });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  app.put('/api/user/basic', userLogged, (req, res) => {
    const basic = req.body;
    const userId = req.user._id;

    sendInitiativeImage(req.body.image)(req.user._id)
      .then((result) => {
        changeBasicUserData({ ...basic, image: result.secure_url}, userId)
          .then(() => {
            res.sendStatus(201);
          })
          .catch((error) => {
            console.error(error);
            res.sendStatus(404);
          });
      })
      .catch(e => {
        console.log(e);
        res.sendStatus(500);
      });
  });

  app.put('/api/user/module', userLogged, (req, res) => {
    const { module } = req.body;
    const moduleIndex = req.body.index;
    const userId = req.user._id; //add id to module
    updateModule(module, userId, moduleIndex)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(404);
      });
  });

  app.delete('/api/user/module/:moduleIndex', userLogged, (req, res) => {
    const { moduleIndex } = req.params;
    const userId = req.user._id;

    deleteModule(userId, moduleIndex)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(404);
      });
  });
};
