const mongoose = require('mongoose');
const { Schema } = mongoose;

const organisationSchema = new Schema({
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
});

mongoose.model('initiatives', organisationSchema);
