"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var schema = new Schema({
  googleId: String,
  image: String,
  firstName: String,
  lastName: String,
  email: String,
  description: String,
  color: String,
  socials: [{
    url: String,
    socialType: String,
    _id: false
  }],
  initiatives: [Schema.Types.ObjectId],
  modules: [{}],
  shortUrl: String
});
module.exports = _mongoose.default.model('users', schema);