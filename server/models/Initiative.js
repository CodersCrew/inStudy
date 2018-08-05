const mongoose = require('mongoose');
const { Schema } = mongoose;

const organisationSchema = new Schema({
  name: String,
  image: String,
  description: String,
  shortUrl: String,
  modules: [{}],
});

mongoose.model('initiatives', organisationSchema);
