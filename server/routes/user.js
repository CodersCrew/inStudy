const { addNewModule } = require('./../services/fetchUser')
module.exports = app => {
  app.post('/api/user/module', (req, res) => {
    const module = req.body.module;
    const userId = req.user._id;

    addNewModule(module, userId)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(404);
      });
  });
};
