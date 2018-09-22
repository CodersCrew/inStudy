"use strict";

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _FetchInitiative = _interopRequireDefault(require("../services/FetchInitiative"));

var _Cloudinary = _interopRequireDefault(require("../services/Cloudinary"));

var _cacher = _interopRequireDefault(require("../services/cacher"));

var _createNewInitiative = _interopRequireDefault(require("../services/createNewInitiative"));

var _auth = require("./validators/auth");

var _initiativeValidators = require("./validators/initiative-validators");

var _mailSender = _interopRequireWildcard(require("../services/mail-sender"));

var _keys = _interopRequireDefault(require("../config/keys"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = _multer.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(file.fieldname, "-").concat(Date.now()).concat(_path.default.extname(file.originalname)));
  }
});

var upload = (0, _multer.default)({
  dest: 'uploads/',
  storage: storage
}); // const upload = multer({ dest: 'uploads/' });

module.exports = function (app) {
  app.get('/api/initiative', function (req, res) {
    var page = req.query.page;
    new _FetchInitiative.default().getShortInitiativeProfile(page).then(function (foundInitiatives) {
      console.log(foundInitiatives);
      res.status(200).json(foundInitiatives);
    }).catch(function () {
      res.sendStatus(404);
    });
  });
  app.post('/api/initiative', _auth.userLogged, function (req, res) {
    var initiative = req.body;
    (0, _createNewInitiative.default)(initiative, req.user).then(function (result) {
      res.status(200).json({
        result: result
      });
    }).catch(function (err) {
      if (err === 'ITEM_EXIST') {
        res.sendStatus(409);
      }
    });
  });
  app.get('/api/initiative/:shortUrl', function (req, res) {
    var shortUrl = req.params.shortUrl;
    new _FetchInitiative.default().getSingleInitiative(shortUrl).then(function (singleInitiative) {
      res.status(200).json(singleInitiative);
    }).catch(function (err) {
      if (err === 'NOT_FOUND') {
        res.sendStatus(404);
      } else {
        console.error(err);
      }
    });
  });
  app.post('/initiative/logo', upload.single('background'), function (req, res) {
    var path = req.file.path; // console.log(req.file)

    new _Cloudinary.default().uploadInitiativeBackground(path, '34234').then(function (result) {
      res.status(200).json({
        result: result
      });
    });
  });
  app.post('/api/initiative/:initId/module', _auth.userLogged, function (req, res) {
    var initId = req.params.initId;
    var module = req.body;
    new _FetchInitiative.default().addInitiativeModule(initId, module).then(function () {
      req.instudyCache = module;
      res.status(200).json(module);
    });
  }, _cacher.default);
  app.get('/api/initiative/:initId/module', _cacher.default, function (req, res) {
    var initId = req.params.initId;
    new _FetchInitiative.default().getAllModules(initId).then(function (modules) {
      res.status(200).json(modules);
    });
  });
  app.put('/api/initiative/:initId/module/:modId', function (req, res) {
    var initId = req.params.initId;
    var modId = req.params.modId;
    var module = req.body;
    new _FetchInitiative.default().updateModule(module, initId, modId).then(function (resModule) {
      console.log(resModule);
      res.status(200).json(resModule);
    }).catch(function (err) {
      return console.error(err);
    });
  });
  app.delete('/api/initiative/:initId/module/:modId', _auth.userLogged, function (req, res) {
    var initId = req.params.initId;
    var modId = req.params.modId;
    new _FetchInitiative.default().deleteModule(initId, modId).then(function () {
      res.sendStatus(201);
    });
  });
  app.post('/api/initiative/:initId/module/reorder', _auth.userLogged, function (req, res) {
    var initId = req.params.initId;
    var modules = req.body; // TODO: kasowanie modułu powinno kasować zdjecia na cloudinary

    new _FetchInitiative.default().reorderModules(initId, modules).then(function () {
      res.sendStatus(201);
    });
  });
  app.delete('/api/initiative/:initId', function (req, res) {
    var initId = req.params.initId;
    console.log(initId);
    new _FetchInitiative.default().deleteInitiative(initId).then(function () {
      res.sendStatus(200);
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
  app.post('/api/initiative/:initId/invite', _initiativeValidators.inviteUserValidators, function (req, res) {
    var email = req.body.email;
    (0, _mailSender.default)(email, _mailSender.INVITE_EMAIL, {
      initiativeID: req.params.initId
    }).then(function () {
      return res.sendStatus(201);
    }).catch(function () {
      return res.sendStatus(500);
    });
  });
  app.get('/api/invite', _initiativeValidators.invitationResponse, function (req, res) {
    var jwt = req.query.jwt;

    var _jsonwebtoken$verify = _jsonwebtoken.default.verify(jwt, _keys.default.cookieKey),
        initiativeID = _jsonwebtoken$verify.initiativeID;

    var user = req.user;
    new _FetchInitiative.default().assignInitiative(user._id, initiativeID).then(function () {
      return res.sendStatus(201);
    }).catch(function () {
      return res.sendStatus(500);
    });
  });
};