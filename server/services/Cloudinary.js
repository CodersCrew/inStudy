const mongoose = require('mongoose');
const Cloudinary = require('cloudinary');
const { cloudinaryConfig } = require('./../config/keys');

Cloudinary.config(cloudinaryConfig);

module.exports.sendInitiativeImage = path => (initiativeId) =>
  Cloudinary.uploader.upload(path, () => {}, {
    public_id: '/image',
    folder: initiativeId,
  });

module.exports.sendInitiativeOpengraph = path => (initiativeId) =>
  Cloudinary.uploader.upload(path, () => {}, {
    public_id: '/opengraph',
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

module.exports.removeImage = public_id =>
  Cloudinary.uploader.destroy(public_id, function(error, result){console.log(result, error)})
