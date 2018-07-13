const mongoose = require('mongoose');
const { Schema } = mongoose;

const organisationSchema = new Schema({
  name: String,
});

mongoose.model('organisations', organisationSchema);
