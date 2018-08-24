const mongoose = require('mongoose');
const { Schema } = mongoose;

const organisationSchema = new Schema({
  name: String,
  image: String,
  description: String,
  shortUrl: String,
  modules: [{}],
  FBProfile: [{}],
});

mongoose.model('initiatives', organisationSchema);
