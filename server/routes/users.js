import { addNewModule, changeBasicUserData, updateModule, deleteModule, getUserData } from '../services/fetchUser';
import { createModuleValidators } from './validators/user-validators';
import { userLogged } from './validators/auth';
import multer from 'multer';
import path from 'path';
const fs = require('fs');
import { sendInitiativeImage, changeToBlob } from '../services/Cloudinary';
const save = require('save-file');
var FileReader = require('filereader')
  , fileReader = new FileReader()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ dest: 'uploads/', storage });

module.exports = (app) => {
  app.get('/api/user/:userId', (req, res) => {
    const { userId } = req.params;

    getUserData(userId)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((errorName) => {
        if (errorName === 'CastError') {
          res.sendStatus(404);
        }
        console.error(errorName);
      });
  });

  app.post('/api/user/module', async (req, res) => {
    const module = req.body;
    const userId = req.user._id;

    const promiseArray = req.body.content.items.map( async (item) => {
      if (item.image) {
        item.image = await changeToBlob(item.image.blob, userId)
      }

      if (item.images) {
        item.images = await Promise.all(item.images.map(async (image) => {
          if (image?.image?.blob) {
            image = await changeToBlob(image.image.blob, userId);
          }

          return Promise.resolve(image);
        }));
      }

      return item;
    });

    req.body.content.items = await Promise.all(promiseArray)

    addNewModule(module, userId)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(404);
      });
  });

  app.put('/api/user/basic', upload.single('image'), (req, res) => {
    const basic = req.body;
    const userId = req.user._id;
    const prefix = Math.random();
    const imagePath = `./temp/${prefix}_${req.body.imageName}`

    var buf = new Buffer(req.body.blob, 'base64');
    fs.writeFile(imagePath, buf, function(err) {
      if(err) {
        console.log("err", err);
      } else {
        sendInitiativeImage(imagePath)(req.user._id)
          .then((result) => {
            changeBasicUserData({ ...basic, image: result.secure_url}, userId)
              .then(() => {
                res.sendStatus(201);
              })
              .catch((error) => {
                console.error(error);
                res.sendStatus(404);
              });
          })
      }
    });
  });

  app.put('/api/user/module', userLogged, (req, res) => {
    const module = req.body.module;
    const moduleIndex = req.body.index;
    const userId = req.user._id;

    updateModule(module, userId, moduleIndex)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(404);
      });
  });

  app.delete('/api/user/module/:moduleIndex', userLogged, (req, res) => {
    const { moduleIndex } = req.params;
    const userId = req.user._id;

    deleteModule(userId, moduleIndex)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(404);
      });
  });
};
