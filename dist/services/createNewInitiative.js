"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _FBCrawler = _interopRequireDefault(require("./../services/Crawler/FBCrawler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createInitiative = function createInitiative(initiative, user) {
  var Initiative = _mongoose.default.model('initiatives');

  return new _FBCrawler.default().addPage("https://www.facebook.com/pg/".concat(initiative.facebookUrl, "/about/?ref=page_internal")).scrape().then(function (fetchedProfile) {
    return new Initiative(_objectSpread({}, initiative, {
      FBProfile: fetchedProfile
    })).save();
  }).then(function (createdInitiative) {
    return assignToUser(createdInitiative, user._id);
  });
};

var assignToUser =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(createdInitiative, userId) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _mongoose.default.model('users').findByIdAndUpdate(userId, {
              $addToSet: {
                initiatives: new _mongoose.default.mongo.ObjectId(createdInitiative._id)
              }
            });

          case 2:
            return _context.abrupt("return", createdInitiative);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function assignToUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var initiativeNotExist = function initiativeNotExist(initiative) {
  var email = initiative.email,
      facebookUrl = initiative.facebookUrl,
      shortUrl = initiative.shortUrl;
  return _mongoose.default.model('initiatives').findOne({
    $or: [{
      email: email
    }, {
      facebookUrl: facebookUrl
    }, {
      shortUrl: shortUrl
    }]
  }).then(function (initiative) {
    if (initiative) {
      return Promise.reject('Dana inicjatywa już istnieje');
    }

    return true;
  });
};

var mapUserInputToSave = function mapUserInputToSave(RAWInputData) {
  var FBUrlRegExp = new RegExp('^@([a-zA-Z0-9]+)$|facebook.com/([a-zA-Z0-9]+)/?$|facebook.com/pg/([a-zA-Z0-9]+)/?|^[a-zA-Z0-9]+$', 'i').exec(RAWInputData.facebookUrl); //TODO: dodac obslluge bledow

  RAWInputData.facebookUrl = FBUrlRegExp.slice(0).reverse().find(function (singleMatch) {
    return singleMatch;
  });
  RAWInputData.shortUrl = RAWInputData.facebookUrl;
  return RAWInputData;
};

var _default = function _default(initiative, user) {
  return initiativeNotExist(mapUserInputToSave(initiative)).then(function () {
    return createInitiative(initiative, user);
  });
};

exports.default = _default;