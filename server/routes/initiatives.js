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
};
