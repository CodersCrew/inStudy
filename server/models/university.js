import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
  name: String,
  image: String,
});

module.exports = mongoose.model('universities', schema);
