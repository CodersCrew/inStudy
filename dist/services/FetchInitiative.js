"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _FBCrawler = _interopRequireDefault(require("./Crawler/FBCrawler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initiativeExist = function initiativeExist(initiativeShortUrl) {
  return _mongoose.default.model('initiatives').findOne({
    shortUrl: initiativeShortUrl
  });
};

var shortenInitiativeProfile = function shortenInitiativeProfile(singleInitiative) {
  var image = singleInitiative.image,
      name = singleInitiative.name,
      description = singleInitiative.description,
      shortUrl = singleInitiative.shortUrl;
  return {
    image: image,
    name: name,
    description: description,
    profileCompleted: true,
    shortUrl: shortUrl,
    university: {
      name: 'Uniwersytet Ekonomiczny',
      id: '1',
      image: '/img/universities/5a90aac95ded6d5a4a06195d.png'
    }
  };
}; //logo tyt opis, czy rekrutuje, czy ma uzupełn profil, uczelnia, id ucz, logo ucz, nazw ucz, short_url


var FetchInitiative =
/*#__PURE__*/
function () {
  function FetchInitiative() {
    var _this = this;

    _classCallCheck(this, FetchInitiative);

    _defineProperty(this, "getInitiative", function (page) {
      if (page) {
        return _this.Initiative.find({}).skip(page * 10).limit(10);
      } else {
        return _this.Initiative.find({});
      }
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
        if (foundInitiative) {
          return Promise.resolve(foundInitiative);
        } else {
          return new _this.Initiative(initiative).save();
        }
      });
    });

    _defineProperty(this, "getSingleInitiative", function (shortUrl) {
      return _this.Initiative.findOne({
        shortUrl: shortUrl
      }).then(function (singleInitiative) {
        return _objectSpread({}, singleInitiative.toObject(), {
          profileCompleted: true
        });
      }).then(function (profile) {
        return mapRAWInitiativeObjectToViewReady(profile);
      }).then(function (singleInitiative) {
        return _objectSpread({}, singleInitiative.toObject(), {
          profileCompleted: true
        });
      }).then(function (profile) {
        return mapRAWInitiativeObjectToViewReady(profile);
      });
    });

    _defineProperty(this, "addInitiativeModule", function (initiativeId, module) {
      module._id = new _mongoose.default.mongo.ObjectId();
      return _this.Initiative.findByIdAndUpdate(initiativeId, {
        $addToSet: {
          modules: module
        }
      });
    });

    _defineProperty(this, "getAllModules", function (initiativeId) {
      return _this.Initiative.findById(initiativeId).then(function (result) {
        return Promise.resolve(result.modules);
      });
    });

    _defineProperty(this, "getFBProfile", function (shortUrl) {
      return new _FBCrawler.default().addPage("https://www.facebook.com/pg/".concat(shortUrl, "/about/?ref=page_internal")).scrape();
    });

    _defineProperty(this, "setFBProfile", function (shortUrl, profile) {
      return _this.Initiative.findOneAndUpdate({
        shortUrl: shortUrl
      }, {
        $set: {
          FBProfile: profile
        }
      });
    });

    this.Initiative = _mongoose.default.model('initiatives');
  }

  _createClass(FetchInitiative, [{
    key: "deleteModule",
    value: function deleteModule(initiativeId, moduleId) {
      return this.Initiative.findByIdAndUpdate(initiativeId, {
        $pull: {
          modules: {
            _id: new _mongoose.default.mongo.ObjectId(moduleId)
          }
        }
      });
    }
  }]);

  return FetchInitiative;
}();

function mapRAWInitiativeObjectToViewReady(RAWInitiative) {
  var AboutPage = RAWInitiative.FBProfile.find(function (page) {
    return page.content && page.content.kind === 'About';
  });

  if (AboutPage && AboutPage.content && AboutPage.content.logo) {
    RAWInitiative.image = AboutPage.content.logo;
  }

  return RAWInitiative;
}

var _default = FetchInitiative;
exports.default = _default;