const mongoose = require('mongoose');
const MemberSchema = require('./member');
const { Schema } = mongoose;


const schema = new Schema({
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
  FBProfile: {},
  image: String,
  opengraph: String,
  socials: [],
  members: [MemberSchema],
});

schema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('initiatives', schema);
