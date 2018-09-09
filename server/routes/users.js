import { addNewModule, changeBasicUserData, updateModule, deleteModule, getUserData } from './../services/fetchUser';
import { createModuleValidators } from './validators/user-validators';
import { userLogged } from './validators/auth';

module.exports = app => {
  app.get('/api/user/:userId', (req, res) => {
    const { userId } = req.params;

    getUserData(userId)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(errorName => {
        if (errorName === 'CastError') {
          res.sendStatus(404);
        }
        console.error(errorName);
      });
  });

  app.post('/api/user/module', (req, res) => {
    const module = req.body;
    const userId = req.user._id;

    addNewModule(module, userId)
      .then(() => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(404);
      });
  });

  app.put('/api/user/basic', userLogged, createModuleValidators, (req, res) => {
    const basic = req.body;
    const userId = req.user._id;

    changeBasicUserData(basic, userId)
      .then(() => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(404);
      });
  });

  app.put('/api/user/module', userLogged, createModuleValidators, (req, res) => {
    const module = req.body.module;
    const moduleIndex = req.body.index;
    const userId = req.user._id;

    updateModule(module, userId, moduleIndex)
      .then(() => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(404);
      });
  });

  app.delete('/api/user/module/:moduleIndex', userLogged, createModuleValidators, (req, res) => {
    const { moduleIndex } = req.params;
    const userId = req.user._id;

    deleteModule(userId, moduleIndex)
      .then(() => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(404);
      });
  });
};
