"use strict";

var _fetchUser = require("../services/fetchUser");

var _auth = require("./validators/auth");

// import { createModuleValidators } from './validators/user-validators';
module.exports = function (app) {
  app.get('/api/user/:userId', function (req, res) {
    var userId = req.params.userId;
    (0, _fetchUser.getUserData)(userId).then(function (user) {
      res.status(200).json(user);
    }).catch(function (errorName) {
      if (errorName === 'CastError') {
        res.sendStatus(404);
      }

      console.error(errorName);
    });
  });
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
  app.put('/api/user/basic', _auth.userLogged, function (req, res) {
    var basic = req.body;
    var userId = req.user._id;
    (0, _fetchUser.changeBasicUserData)(basic, userId).then(function () {
      res.sendStatus(201);
    }).catch(function (error) {
      console.error(error);
      res.sendStatus(404);
    });
  });
  app.put('/api/user/module', _auth.userLogged, function (req, res) {
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
  app.delete('/api/user/module/:moduleIndex', _auth.userLogged, function (req, res) {
    var moduleIndex = req.params.moduleIndex;
    var userId = req.user._id;
    (0, _fetchUser.deleteModule)(userId, moduleIndex).then(function () {
      res.sendStatus(201);
    }).catch(function (error) {
      console.error(error);
      res.sendStatus(404);
    });
  });
  app.post('/api/user/module/reorder', function (req, res) {
    var userId = req.user._id;
    var modules = req.body;
    (0, _fetchUser.reorderModules)(userId, modules).then(function () {
      res.sendStatus(201);
    }).catch(function (error) {
      console.error(error);
      res.sendStatus(404);
    });
  });
};