import { fetchCities, fetchUniversities } from './../services/fetchCities';

module.exports = app => {
  app.get('/api/cities', async (req, res) => {
    const result = await fetchCities();
    res.status(200).json(result);
  });

  app.get('/api/cities/universities/:cityId', async (req, res) => {
    const { cityId } = req.params;
    const result = await fetchUniversities(cityId);
    res.status(200).json(result);
  });
};
