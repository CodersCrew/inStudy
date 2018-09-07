const multer  = require('multer');
const { sendInitiativeImage } = require('./../services/Cloudinary');
const getFileType = (filename) => {
  const splitedFilename = filename.split('.');
  console.log(splitedFilename)
  return splitedFilename[splitedFilename.length-1];
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}.${getFileType(file.originalname)}`),
});

module.exports = (app) => {
  app.post('/api/picture', multer({ storage }).single('picture'), (req, res) => {
    const { where, initiativeId } = req.body;

    const path = `${req.file.path}`;

    const locationDispatcher = {
      image: () => sendInitiativeImage(path)(initiativeId),
    };

    const result = locationDispatcher[where];
    if (result) {
      return result()
        .then(() => {
          res.sendStatus(201);
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
