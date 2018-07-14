const FetchInitiative = require('./../services/FetchInitiative');

module.exports = app => {
  app.get('/api/initiative', (req, res) => {
    const { page } = req.query;
    new FetchInitiative().getShortInitiativeProfile(page).then(foundInitiatives => {
      res.status(200).json({ result: foundInitiatives });
    });
  });

  app.post('/api/initiative', (req, res) => {
    const { initiative } = req.body;

    new FetchInitiative().setInitiative(initiative).then(result => {
      res.status(200).json({ result });
    });
  });

  app.get('/api/initiative/:shortUrl', (req, res) => {
    const { shortUrl } = req.params;
    new FetchInitiative().getSingleInitiative(shortUrl).then(singleInitiative => {
      res.status(200).json({ result: singleInitiative });
    });
  });
};
