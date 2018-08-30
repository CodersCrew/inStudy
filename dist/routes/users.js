"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fetchUser = require("./../services/fetchUser");

var _default = function _default(app) {
  app.post('/api/user/module', function (req, res) {
    var module = req.body;
    var userId = req.user._id;
    (0, _fetchUser.addNewModule)(module, userId).then(function () {
      res.sendStatus(201);
    }).catch(function (error) {
      console.error(error);
      res.sendStatus(404);
    });
  });
  app.put('/api/user/basic', function (req, res) {
    var basic = req.body;
    var userId = req.user._id;
    console.log(basic, userId);
    (0, _fetchUser.changeBasicUserData)(basic, userId).then(function () {
      res.sendStatus(201);
    }).catch(function (error) {
      console.error(error);
      res.sendStatus(404);
    });
  });
  app.put('/api/user/module', function (req, res) {
    var module = req.body.module;
    var moduleIndex = req.body.index;
    var userId = req.user._id;
    (0, _fetchUser.updateModule)(module, userId, moduleIndex).then(function () {
      res.sendStatus(201);
    }).catch(function (error) {
      console.error(error);
      res.sendStatus(404);
    });
  });
  app.delete('/api/user/module/:moduleIndex', function (req, res) {
    var moduleIndex = req.params.moduleIndex;
    var userId = req.user._id;
    (0, _fetchUser.deleteModule)(userId, moduleIndex).then(function () {
      res.sendStatus(201);
    }).catch(function (error) {
      console.error(error);
      res.sendStatus(404);
    });
  });
};

exports.default = _default;