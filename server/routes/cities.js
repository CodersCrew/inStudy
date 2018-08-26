const FetchCity = require('./../services/fetchCities');

module.exports = app => {
  app.get('/api/cities', (req, res) => {
    FetchCity
      .fetchCities()
      .then((result) => {
        res
          .status(200)
          .json(result)
      })
  });

  app.get('/api/cities/universities/:cityId', (req, res) => {
    const cityId = req.params.cityId;
    FetchCity
      .fetchUniversities(cityId)
      .then((result) => res.status(200).json(result))
  });
};
