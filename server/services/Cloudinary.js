const mongoose = require('mongoose');
const Initiative = mongoose.model('initiatives');
import Cloudinary from 'cloudinary';
import fs from 'fs';
import { file_cloud } from './../config/keys';

Cloudinary.config(file_cloud);

const removeFile = path => {
  fs.unlinkSync(path);
};


module.exports.sendInitiativeImage = path => (initiativeId) => {
  return Cloudinary.uploader.upload(path, () => {}, {
    public_id: `${initiativeId}/image`,
  })
    .then((result) => {
      return Initiative.findByIdAndUpdate(initiativeId, {
        $set: {
          image: result.url,
        },
      });
    })
    .then(() => removeFile(path));
};
