"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FetchInitiative = _interopRequireDefault(require("./../services/FetchInitiative"));

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _Cloudinary = _interopRequireDefault(require("./../services/Cloudinary"));

var _index = _interopRequireDefault(require("../services/cacher/index"));

var _createNewInitiative = _interopRequireDefault(require("./../services/createNewInitiative"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = _multer.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + _path.default.extname(file.originalname));
  }
});

var upload = (0, _multer.default)({
  dest: 'uploads/',
  storage: storage
}); // const upload = multer({ dest: 'uploads/' });

var _default = function _default(app) {
  app.get('/api/initiative', function (req, res) {
    var page = req.query.page;
    new _FetchInitiative.default().getShortInitiativeProfile(page).then(function (foundInitiatives) {
      res.status(200).json(foundInitiatives);
    }).catch(function () {
      res.sendStatus(404);
    });
  });
  app.post('/api/initiative', function (req, res) {
    var initiative = req.body;
    (0, _createNewInitiative.default)(initiative, req.user).then(function (result) {
      res.status(200).json({
        result: result
      });
    }).catch(function (err) {
      console.log(err);
      res.sendStatus(404);
    });
  });
  app.get('/api/initiative/:shortUrl', function (req, res) {
    var shortUrl = req.params.shortUrl;
    new _FetchInitiative.default().getSingleInitiative(shortUrl).then(function (singleInitiative) {
      res.status(200).json({
        result: singleInitiative
      });
    }).catch(function () {
      res.sendStatus(404);
    });
  });
  app.post('/initiative/logo', upload.single('background'), function (req, res) {
    var path = req.file.path; // console.log(req.file)

    new _Cloudinary.default().uploadInitiativeBackground(path, '34234').then(function (result) {
      console.log(result);
      res.status(200).json({
        result: result
      });
    }); // app.post('/initiative/:shortUrl', upload.single('image'), (req, res) => {
    //   const { shortUrl } = req.params;
    //   new FetchInitiative()
    //     .putInitiative()
    // });
  });
  app.post('/api/initiative/:initId/module', function (req, res, next) {
    var initId = req.params.initId;
    var module = req.body.module;
    new _FetchInitiative.default().addInitiativeModule(initId, module).then(function () {
      req.instudyCache = module;
      next(); // res
      //   .sendStatus(201);
    });
  }, _index.default);
  app.get('/api/initiative/:initId/module', _index.default, function (req, res) {
    var initId = req.params.initId;
    new _FetchInitiative.default().getAllModules(initId).then(function (modules) {
      res.status(200).json(modules);
    });
  });
  app.delete('/api/initiative/:initId/module/:modId', function (req, res) {
    var initId = req.params.initId;
    var modId = req.params.modId;
    new _FetchInitiative.default().deleteModule(initId, modId).then(function () {
      res.sendStatus(201);
    });
  });
  app.post('/api/initiative/:shortUrl/fetch', function (req, res) {
    var shortUrl = req.params.shortUrl;
    new _FetchInitiative.default().getFBProfile(shortUrl).then(function (result) {
      return new _FetchInitiative.default().setFBProfile(shortUrl, result);
    }).then(function () {
      return res.sendStatus(201);
    });
  });
};

exports.default = _default;