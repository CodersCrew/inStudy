"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.INVITE_EMAIL = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _keys = _interopRequireDefault(require("../config/keys"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transporter = _nodemailer.default.createTransport(_keys.default.MAIL_CONFIG);

var INVITE_EMAIL = 'INVITE_EMAIL';
exports.INVITE_EMAIL = INVITE_EMAIL;

var _default = function _default(email, kind, data) {
  switch (kind) {
    case INVITE_EMAIL:
      {
        var initiativeID = data.initiativeID;
        console.log(initiativeID);

        var token = _jsonwebtoken.default.sign({
          initiativeID: initiativeID
        }, _keys.default.cookieKey);

        var mailOptions = {
          from: 'instudy',
          to: email,
          subject: 'zapro',
          text: 'fdssfsdfsd',
          html: "<a href=\"".concat(_keys.default.HOST, "/api/invite?jwt=").concat(token, "\">invitation</a>:")
        };
        return new Promise(function (resolve, reject) {
          transporter.sendMail(mailOptions, function (error, info) {
            console.log(error, info);
            if (error) return reject();
            return resolve();
          });
        });
      }

    default:
      {}
  }
};

exports.default = _default;