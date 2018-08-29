import cloudinary from 'cloudinary';
import fs from 'fs';
import { file_cloud } from './../config/keys';

cloudinary.config(file_cloud);

const removeFile = path => {
  fs.unlinkSync(path);
}

class CloudinaryAPI {
  constructor() {
    this.cloudinary = cloudinary;
  }

  uploadInitiativeBackground = (path, initiativeId) =>
    this.cloudinary.uploader
      .upload(path, () => {}, {
        public_id: `${initiativeId}/background`,
      })
      .then(result => {
        removeFile(path);
        return Promise.resolve(result);
      });
}

export default CloudinaryAPI;
