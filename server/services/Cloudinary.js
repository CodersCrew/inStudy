const mongoose = require('mongoose');
const Cloudinary = require('cloudinary');
const { cloudinaryConfig } = require('./../config/keys');

const Initiative = mongoose.model('initiatives');

Cloudinary.config(cloudinaryConfig);

module.exports.sendInitiativeImage = path => (initiativeId) =>
  Cloudinary.uploader.upload(path, () => {}, {
    public_id: '/image',
    folder: initiativeId,
  });

module.exports.sendUserImage = path => (userId) =>
  Cloudinary.uploader.upload(path, () => {}, {
    public_id: '/image',
    folder: userId,
  });

module.exports.sendModuleImage = path => (initiativeId) =>
  Cloudinary.uploader.upload(path, () => {}, {
    public_id: `/${Math.floor(Math.random() * 10000)}`,
    folder: `${initiativeId}/modules`,
  });
