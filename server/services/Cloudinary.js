const cloudinary = require('cloudinary');
const fs = require('fs');
const { cloud_name, api_key, api_secret } = require('./../config/keys').file_cloud;
cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

function CloudinaryAPI() {
  this.cloudinary = cloudinary;
}

CloudinaryAPI.prototype.uploadInitiativeBackground = function(path, initiativeId) {
  return this.cloudinary.uploader
    .upload( path, ()=> {},
    {
      public_id: `${initiativeId}/background`,
    }
  )
    .then((result) => {
      removeFile(path);
      return Promise.resolve(result);
    });
};

function removeFile(path) {
  fs.unlinkSync(path);
}

module.exports = CloudinaryAPI;
