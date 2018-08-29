import storage from './storage';

export default (req, res, next) => {
  const path = req.path;
  const method = req.method;
  const cache = req.instudyCache;

  if (method === 'GET') {
    const result = storage.find(path);
    console.log(result)
    if (result) {
      res
        .status(200)
        .json(result);
    } else {
      next();
    }
  } else {
    storage.save(path, cache);
    res
      .sendStatus(201);
  }

};
