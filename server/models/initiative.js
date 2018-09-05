import mongoose from 'mongoose';
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
  modules: [{}],
  FBProfile: [{}],
  image: String,
});

module.exports = mongoose.model('initiatives', schema);
