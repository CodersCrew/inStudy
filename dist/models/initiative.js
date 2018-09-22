"use strict";

var mongoose = require('mongoose');

var MemberSchema = require('./member');

var Schema = mongoose.Schema;
var schema = new Schema({
  name: String,
  description: String,
  email: String,
  city: String,
  category: String,
  university: String,
  facebookUrl: String,
  shortUrl: String,
  color: String,
  modules: [{}],
  FBProfile: [{}],
  image: String,
  members: [MemberSchema]
});
module.exports = mongoose.model('initiatives', schema);