import FetchInitiative from './../services/FetchInitiative';
import multer from 'multer';
import path from 'path';
import Cloudinary from './../services/Cloudinary';
import cacher from '../services/cacher/index';
import createNewInitiative from './../services/createNewInitiative';

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

export default app => {
  app.get('/api/initiative', (req, res) => {
    const { page } = req.query;
    new FetchInitiative()
      .getShortInitiativeProfile(page)
      .then(foundInitiatives => {
        res.status(200).json(foundInitiatives);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  });

  app.post('/api/initiative', (req, res) => {
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

  app.get('/api/initiative/:shortUrl', (req, res) => {
    const { shortUrl } = req.params;
    new FetchInitiative()
      .getSingleInitiative(shortUrl)
      .then(singleInitiative => {
        res.status(200).json(singleInitiative);
      })
      .catch(err => {
        if (err === 'NOT_FOUND') {
          res.sendStatus(404);
        } else {
          console.error(err);
        }
      });
  });

  app.post('/initiative/logo', upload.single('background'), (req, res) => {
    const path = req.file.path;
    // console.log(req.file)
    new Cloudinary().uploadInitiativeBackground(path, '34234').then(result => {
      console.log(result);
      res.status(200).json({ result });
    });

    // app.post('/initiative/:shortUrl', upload.single('image'), (req, res) => {
    //   const { shortUrl } = req.params;
    //   new FetchInitiative()
    //     .putInitiative()
    // });
  });

  app.post(
    '/api/initiative/:initId/module',
    (req, res, next) => {
      const initId = req.params.initId;
      const module = req.body;

      new FetchInitiative().addInitiativeModule(initId, module).then(() => {
        req.instudyCache = module;
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

  app.put('/api/initiative/:initId/module/:modId', (req, res) => {
    const initId = req.params.initId;
    const modId = req.params.modId;
    const module = req.body;

    new FetchInitiative()
      .updateModule(module, initId, modId)
      .then(module => {
        console.log(module);
        res.status(200).json(module);
      })
      .catch(err => console.error(err));
  });

  app.delete('/api/initiative/:initId/module/:modId', (req, res) => {
    const initId = req.params.initId;
    const modId = req.params.modId;

    new FetchInitiative().deleteModule(initId, modId).then(() => {
      res.sendStatus(201);
    });
  });

  app.delete('/api/initiative/:initId', (req, res) => {
    const initId = req.params.initId;
    console.log(initId);

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
};
