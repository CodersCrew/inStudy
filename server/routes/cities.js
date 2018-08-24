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

  app.get('/api/cities/universities/:city', (req, res) => {
    const city = req.params.city;
    FetchCity
      .fetchUniversities(city)
      .then((result) => res.status(200).json(result))
  });
};
