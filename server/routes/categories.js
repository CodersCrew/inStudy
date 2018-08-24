const FetchCategory = require('./../services/fetchCategories');

module.exports = app => {
  app.get('/api/category', (req, res) => {
    FetchCategory
      .fetchCategories()
      .then((result) => {
        res
          .status(200)
          .json(result)
      })
  });
};
