const multer  = require('multer');
const { sendInitiativeImage, sendModuleImage } = require('./../services/Cloudinary');
const getFileType = (filename) => {
  const splitedFilename = filename.split('.');
  return splitedFilename[splitedFilename.length - 1];
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}.${getFileType(file.originalname)}`),
});

module.exports = (app) => {
  app.post('/api/picture', multer({ storage }).single('picture'), (req, res) => {
    const { where, initiativeId, moduleId } = req.body;

    const { path, filename } = req.file;

    const locationDispatcher = {
      image: () => sendInitiativeImage(path)(initiativeId),
      module: () => sendModuleImage(path, filename)(initiativeId, moduleId),
    };

    const result = locationDispatcher[where];
    if (result) {
      return result()
        .then(({ url }) => {
          res.status(200)
             .json({ url });
        })
        .catch((error) => {
          console.log(error)
          res.sendStatus(403);
        });
    } else {
      res.sendStatus(404);
    }
  });
};
