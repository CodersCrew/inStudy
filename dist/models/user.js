"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var userSchema = new Schema({
  googleId: String,
  image: String,
  firstName: String,
  lastName: String,
  email: String,
  description: String,
  socials: [{
    url: String,
    socialType: String,
    _id: false
  }],
  initiatives: [Schema.Types.ObjectId],
  modules: [{}]
});
var _default = {
  name: 'users',
  schema: userSchema
};
exports.default = _default;