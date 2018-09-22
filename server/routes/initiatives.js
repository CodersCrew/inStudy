import multer from 'multer';
import path from 'path';
import jsonwebtoken from 'jsonwebtoken';
import FetchInitiative from '../services/FetchInitiative';
import Cloudinary from '../services/Cloudinary';
import cacher from '../services/cacher';
import createNewInitiative from '../services/createNewInitiative';
import { userLogged } from './validators/auth';
import { inviteUserValidators, invitationResponse } from './validators/initiative-validators';
import mailSender, { INVITE_EMAIL } from '../services/mail-sender';
import config from '../config/keys';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ dest: 'uploads/', storage });
// const upload = multer({ dest: 'uploads/' });

module.exports = (app) => {
  app.get('/api/initiative', (req, res) => {
    const { page } = req.query;
    new FetchInitiative()
      .getShortInitiativeProfile(page)
      .then((foundInitiatives) => {
        res.status(200).json(foundInitiatives);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  });

  app.post('/api/initiative', userLogged, (req, res) => {
    const initiative = req.body;
    createNewInitiative(initiative, req.user)
      .then((result) => {
        res.status(200).json({ result });
      })
      .catch((err) => {
        if (err === 'ITEM_EXIST') {
          res.sendStatus(409);
        }
      });
  });

  app.get('/api/initiative/:shortUrl', (req, res) => {
    const { shortUrl } = req.params;
    new FetchInitiative()
      .getSingleInitiative(shortUrl)
      .then((singleInitiative) => {
        res.status(200).json(singleInitiative);
      })
      .catch((err) => {
        if (err === 'NOT_FOUND') {
          res.sendStatus(404);
        } else {
          console.error(err);
        }
      });
  });

  app.post('/initiative/logo', upload.single('background'), (req, res) => {
    const { path } = req.file;
    // console.log(req.file)
    new Cloudinary().uploadInitiativeBackground(path, '34234').then((result) => {
      res.status(200).json({ result });
    });
  });

  app.post('/api/initiative/:initId/module', userLogged, (req, res) => {
    const { initId } = req.params;
    const module = req.body;

    new FetchInitiative().addInitiativeModule(initId, module).then(() => {
      req.instudyCache = module;
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

  app.put('/api/initiative/:initId/module/:modId', (req, res) => {
    const { initId } = req.params;
    const { modId } = req.params;
    const module = req.body;

    new FetchInitiative()
      .updateModule(module, initId, modId)
      .then((resModule) => {
        console.log(resModule);
        res.status(200).json(resModule);
      })
      .catch(err => console.error(err));
  });

  app.delete('/api/initiative/:initId/module/:modId', userLogged, (req, res) => {
    const { initId } = req.params;
    const { modId } = req.params;

    new FetchInitiative().deleteModule(initId, modId).then(() => {
      res.sendStatus(201);
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
    const { initId } = req.params;
    console.log(initId);

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
