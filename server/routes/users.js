import { addNewModule, changeBasicUserData, updateModule, deleteModule } from './../services/fetchUser';

export default app => {
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

  app.put('/api/user/basic', (req, res) => {
    const basic = req.body;
    const userId = req.user._id;
    console.log(basic, userId);
    changeBasicUserData(basic, userId)
      .then(() => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(404);
      });
  });

  app.put('/api/user/module', (req, res) => {
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

  app.delete('/api/user/module/:moduleIndex', (req, res) => {
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
