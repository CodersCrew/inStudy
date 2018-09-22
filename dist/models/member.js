"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var schema = new Schema({
  user: Schema.Types.ObjectId,
  role: {
    type: String,
    default: 'Członek inicjatywy'
  },
  roleDescription: String
});

_mongoose.default.model('member', schema);

module.exports = schema;