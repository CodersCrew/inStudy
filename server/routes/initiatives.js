import jsonwebtoken from 'jsonwebtoken';
import mongoose from 'mongoose';
import {
  getShortInitiativeProfile,
  getSingleInitiative,
  deleteModule,
  reorderModules,
  deleteInitiative,
  assignInitiative,
  changeBasicInitiativeData,
  addInitiativeModule,
  getAllModules,
  updateModule,
} from './../services/FetchInitiative';
import { sendInitiativeImage, removeImage, sendModuleImage } from './../services/Cloudinary';
import cacher from '../services/cacher/index';
import createNewInitiative from '../services/createNewInitiative';
import { userLogged, permissionGranted } from './validators/auth';
import { MODIFY_INITIATIVE } from './validators/consts';
import {
  inviteUserValidators,
  invitationResponse,
  get_api_initiative
} from './validators/initiative-validators';
import mailSender, { INVITE_EMAIL, INITIATIVE_CONTACT_EMAIL, RESTORE_ACCOUNT } from './../services/mail-sender';
import config from '../config/keys';
const Initiative = mongoose.model('initiatives');
const Member = mongoose.model('member');
const User = mongoose.model('users');
import roles, { ADMIN } from './../services/roles';
const to = require('./../utils/to');
const { initiativeDebug } = require('./../utils/debug');
// const makeOpengraph = require('./../services/opengraph/opengraph');

module.exports = (app) => {
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
        // makeOpengraph(initiativeId, secure_url, basic.name, basic.description);
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

  app.get('/api/initiative/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;

    const [err, initiative] = await to(getSingleInitiative(shortUrl));
    if (err) res.sendStatus(500);
    else res.status(200).json(initiative);
  });

  app.post('/api/initiative/:initId/module', userLogged, async (req, res, next) => {
    const { initId } = req.params;
    const module = req.body;

      const [err, updatedModule] = await to(addInitiativeModule(initId, module));
      if (err) res.sendStatus(500)
      else res.status(200).json(updatedModule);
    }
  );

  app.get('/api/initiative/:initId/module', async (req, res) => {
    const { initId } = req.params;

    const [err, modules] = await to(getAllModules(initId));
    if (err) res.sendStatus(500);
    else res.status(200).json(modules);
  });

  app.post('/api/initiative/:initId/send-message', async (req, res) => {
    const { initId } = req.params;
    const emailParams = req.body;
    const { email } = await Initiative.findById(initId);

    mailSender(email, INITIATIVE_CONTACT_EMAIL, emailParams)
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500));
  });

  app.put('/api/initiative/:initId/module/:modId', async (req, res) => {
    const { initId } = req.params;
    const { modId } = req.params;
    const module = req.body;

    const [err, updatedModule] = await to(updateModule(module, initId, modId))
    if (err) res.sendStatus(500);
    else res.status(200).json(updatedModule);
  });

  app.delete('/api/initiative/:initId/module/:modId', userLogged, async (req, res) => {
    const { initId } = req.params;
    const { modId } = req.params;

    const [err] = await to(deleteModule(initId, modId));
    if (err) res.sendStatus(500);
    else res.sendStatus(201);
  });

  app.post('/api/initiative/:initId/module/reorder', userLogged, async (req, res) => {
    const { initId } = req.params;
    const modules = req.body;

    const [err] = await to(reorderModules(initId, modules));
    if (err) res.sendStatus(500);
    else res.sendStatus(201);
  });

  app.delete('/api/initiative/:initId', async (req, res) => {
    const { initId } = req.params;

    const [err] = await to(deleteInitiative(initId));
    if (err) res.sendStatus(500);
    else res.sendStatus(201);
  });

  app.post('/api/initiative/:initId/invite', inviteUserValidators, (req, res) => {
    const { email } = req.body;

    mailSender(email, INVITE_EMAIL, { initiativeID: req.params.initId })
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500));
  });

  app.get('/api/invite', invitationResponse, async (req, res) => {//TODO: zmienic mechanike zapraszania
    const { jwt } = req.query;

    const { initiativeID } = jsonwebtoken.verify(jwt, config.cookieKey);
    const { user } = req;

    const [err] = await to(assignInitiative(user._id, initiativeID));
    if (err) res.sendStatus(500);
    else res.sendStatus(201);
  });
};
