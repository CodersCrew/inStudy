"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _FBCrawler = _interopRequireDefault(require("./Crawler/FBCrawler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Initiative = _mongoose.default.model('initiatives');

var User = _mongoose.default.model('users');

var initiativeExist = function initiativeExist(initiativeShortUrl) {
  return _mongoose.default.model('initiatives').findOne({
    shortUrl: initiativeShortUrl
  });
};

var shortenInitiativeProfile = function shortenInitiativeProfile(singleInitiative) {
  var _singleInitiative$FBP, _singleInitiative$FBP2;

  var name = singleInitiative.name,
      description = singleInitiative.description,
      shortUrl = singleInitiative.shortUrl,
      color = singleInitiative.color;
  return {
    image: (_singleInitiative$FBP = singleInitiative.FBProfile[0]) === null || _singleInitiative$FBP === void 0 ? void 0 : (_singleInitiative$FBP2 = _singleInitiative$FBP.content) === null || _singleInitiative$FBP2 === void 0 ? void 0 : _singleInitiative$FBP2.logo,
    name: name,
    description: description,
    color: color,
    profileCompleted: true,
    shortUrl: shortUrl,
    university: {
      name: 'Uniwersytet Ekonomiczny',
      id: '1',
      image: '/img/universities/5a90aac95ded6d5a4a06195d.png'
    }
  };
};

var mapRAWInitiativeObjectToViewReady = function mapRAWInitiativeObjectToViewReady(RAWInitiative) {
  if (RAWInitiative) {
    var AboutPage = RAWInitiative.FBProfile.find(function (page) {
      return page.content && page.content.kind === 'About';
    });

    if (AboutPage && AboutPage.content && AboutPage.content.logo) {
      return _objectSpread({}, RAWInitiative, {
        image: AboutPage.content.logo
      });
    }
  }

  return RAWInitiative;
}; // logo tyt opis, czy rekrutuje, czy ma uzupełn profil, uczelnia, id ucz, logo ucz, nazw ucz, short_url


var FetchInitiative = function FetchInitiative() {
  var _this = this;

  _classCallCheck(this, FetchInitiative);

  _defineProperty(this, "getInitiative", function (page) {
    if (page) {
      return Initiative.find({}).skip(page * 10).limit(10);
    }

    return Initiative.find({});
  });

  _defineProperty(this, "deleteInitiative", function (initId) {
    return _this.Initiative.findByIdAndDelete(initId);
  });

  _defineProperty(this, "getShortInitiativeProfile", function (page) {
    return _this.getInitiative(page).then(function (initiatives) {
      return initiatives.map(function (singleInitiative) {
        return shortenInitiativeProfile(singleInitiative);
      });
    });
  });

  _defineProperty(this, "setInitiative", function (initiative) {
    return initiativeExist(initiative.shortUrl).then(function (foundInitiative) {
      return foundInitiative ? Promise.resolve(foundInitiative) : new Initiative(initiative).save();
    });
  });

  _defineProperty(this, "getSingleInitiative", function (shortUrl) {
    return new Promise(function (resolve, reject) {
      Initiative.findOne({
        shortUrl: shortUrl
      }, function (err, initiative) {
        if (initiative === null) {
          reject('NOT_FOUND');
        } else {
          var profile = _objectSpread({}, initiative.toObject(), {
            profileCompleted: true
          });

          resolve(mapRAWInitiativeObjectToViewReady(profile));
        }
      });
    });
  });

  _defineProperty(this, "addInitiativeModule", function (initiativeId, module) {
    console.log(initiativeId);
    console.log(module);
    module._id = new _mongoose.default.mongo.ObjectId();
    return Initiative.findByIdAndUpdate(initiativeId, {
      $addToSet: {
        modules: module
      }
    });
  });

  _defineProperty(this, "getAllModules", function (initiativeId) {
    return Initiative.findById(initiativeId).then(function (result) {
      return result.modules;
    });
  });

  _defineProperty(this, "updateModule", function (module, initiativeId, moduleId) {
    return new Promise(function (resolve, reject) {
      Initiative.findById(initiativeId, function (err, initiative) {
        var newModule;
        var updatedModules = initiative.modules.map(function (item) {
          if (String(item._id) === String(moduleId)) {
            newModule = _objectSpread({}, module, {
              _id: new _mongoose.default.mongo.ObjectId()
            });
            return newModule;
          }

          return item;
        });
        Initiative.findByIdAndUpdate(initiativeId, {
          $set: {
            modules: updatedModules
          }
        }, function (error) {
          if (error) {
            reject(error);
          } else {
            resolve(newModule);
          }
        });
      });
    });
  });

  _defineProperty(this, "deleteModule", function (initiativeId, moduleId) {
    return Initiative.findByIdAndUpdate(initiativeId, {
      $pull: {
        modules: {
          _id: new _mongoose.default.mongo.ObjectId(moduleId)
        }
      }
    });
  });

  _defineProperty(this, "reorderModules", function (initId, modules) {
    return Initiative.findByIdAndUpdate(initId, {
      $set: {
        modules: modules
      }
    });
  });

  _defineProperty(this, "getFBProfile", function (shortUrl) {
    return new _FBCrawler.default().addPage("https://www.facebook.com/pg/".concat(shortUrl, "/about/?ref=page_internal")).scrape();
  });

  _defineProperty(this, "setFBProfile", function (shortUrl, profile) {
    return Initiative.findOneAndUpdate({
      shortUrl: shortUrl
    }, {
      $set: {
        FBProfile: profile
      }
    });
  });

  _defineProperty(this, "assignInitiative", function (userId, initiativeId) {
    return User.findByIdAndUpdate(userId, {
      $addToSet: {
        initiatives: initiativeId
      }
    });
  });
};

var _default = FetchInitiative;
exports.default = _default;