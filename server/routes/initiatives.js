const FetchInitiative = require('./../services/FetchInitiative');

module.exports = app => {
  app.get('/initiative', (req, res) => {
    const { page } = req.query;
    new FetchInitiative()
      .getShortInitiativeProfile(page)
      .then(foundInitiatives => {
        res
          .status(200)
          .json({result: foundInitiatives});
      })
  });

  app.post('/initiative', (req, res) => {
    const { initiative } = req.body;

    new FetchInitiative()
      .setInitiative(initiative)
      .then(result => {
        res
          .status(200)
          .json({result});
      })
  });
};
