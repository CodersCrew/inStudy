const mongoose = require('mongoose');
const { Schema } = mongoose;

const universitySchema = new Schema({
  name: String,
});

mongoose.model('universities', universitySchema);
