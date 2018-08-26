const mongoose = require('mongoose');
const { Schema } = mongoose;

const citySchema = new Schema({
  name: String,
});

mongoose.model('cities', citySchema);
