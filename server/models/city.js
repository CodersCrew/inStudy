import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
  name: String,
});

module.exports = mongoose.model('cities', schema);
