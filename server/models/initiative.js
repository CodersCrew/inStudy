const mongoose = require('mongoose');
const MemberSchema = require('./member');
const { Schema } = mongoose;

const requireField = field => [true, `Field: ${field} is required`];

const schema = new Schema({
  name: {
    type: String,
    required: requireField('name'),
  },
  description: String,
  email: {
    type: String,
    required: requireField('email'),
  },
  city: String,
  category: String,
  university: String,
  facebookUrl: String,
  shortUrl: String,
  color: String,
  modules: [{}],
  FBProfile: {},
  image: String,
  socials: [],
  members: [MemberSchema],
  opengraph: String,
});

schema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('initiatives', schema);
