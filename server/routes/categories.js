import FetchCategory from './../services/fetchCategories';

export default app => {
  app.get('/api/category', (req, res) => {
    FetchCategory.fetchCategories().then(result => {
      res.status(200).json(result);
    });
  });
};
