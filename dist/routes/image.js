"use strict";

var multer = require('multer');

var _require = require('./../services/Cloudinary'),
    sendInitiativeImage = _require.sendInitiativeImage,
    sendModuleImage = _require.sendModuleImage;

var getFileType = function getFileType(filename) {
  var splitedFilename = filename.split('.');
  return splitedFilename[splitedFilename.length - 1];
};

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    return cb(null, 'uploads/');
  },
  filename: function filename(req, file, cb) {
    return cb(null, "".concat(file.fieldname, "-").concat(Date.now(), ".").concat(getFileType(file.originalname)));
  }
});

module.exports = function (app) {
  app.post('/api/picture', multer({
    storage: storage
  }).single('picture'), function (req, res) {
    var _req$body = req.body,
        where = _req$body.where,
        initiativeId = _req$body.initiativeId,
        moduleId = _req$body.moduleId;
    var _req$file = req.file,
        path = _req$file.path,
        filename = _req$file.filename;
    var locationDispatcher = {
      image: function image() {
        return sendInitiativeImage(path)(initiativeId);
      },
      module: function module() {
        return sendModuleImage(path, filename)(initiativeId, moduleId);
      }
    };
    var result = locationDispatcher[where];

    if (result) {
      return result().then(function (_ref) {
        var url = _ref.url;
        res.status(200).json({
          url: url
        });
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(403);
      });
    } else {
      res.sendStatus(404);
    }
  });
};