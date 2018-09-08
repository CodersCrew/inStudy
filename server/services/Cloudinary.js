const mongoose = require('mongoose');
import Cloudinary from 'cloudinary';
import fs from 'fs';
import { cloudinaryConfig } from './../config/keys';

const Initiative = mongoose.model('initiatives');

Cloudinary.config(cloudinaryConfig);

const removeFile = path => fs.unlinkSync(path);


module.exports.sendInitiativeImage = path => (initiativeId) => {
  return Cloudinary.uploader.upload(path, () => {}, {
    public_id: `/image`,
    folder: initiativeId,
  })
    .then((cloudinaryResponse) => {
      return Initiative.findByIdAndUpdate(initiativeId, {
        $set: {
          image: cloudinaryResponse.url,
        },
      })
        .then(() => cloudinaryResponse);
    })
    .then((result) => {
      removeFile(path);
      return result;
    });
};

module.exports.sendModuleImage = (path, filename) => (initiativeId, moduleId) => {
  return Cloudinary.uploader.upload(path, () => {}, {
    public_id: `/${filename.split('.')[0]}`,
    folder: `${initiativeId}/modules/${moduleId}`,
  })
    .then((result) => {
      removeFile(path);
      return result;
    });
};
