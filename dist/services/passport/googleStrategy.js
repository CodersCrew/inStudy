"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _keys = _interopRequireDefault(require("../../config/keys"));

var _InitializeUserAccount = _interopRequireDefault(require("./../InitializeUserAccount"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(User) {
  return {
    config: {
      clientID: _keys.default.googleClientID,
      clientSecret: _keys.default.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    callback: function () {
      var _callback = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(accessToken, refreshToken, profile, done) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                new _InitializeUserAccount.default(profile).prepare().then(function (user) {
                  return done(null, user);
                });

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function callback(_x, _x2, _x3, _x4) {
        return _callback.apply(this, arguments);
      };
    }()
  };
};

exports.default = _default;