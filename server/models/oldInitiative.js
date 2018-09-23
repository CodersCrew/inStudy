const mongoose = require('mongoose');
const config = require('./../config/keys');
const oldDBMongoConnection = mongoose.createConnection(config.mongoURIold);

const { Schema } = mongoose;

const schema = new Schema({
  name: String,
});

module.exports = oldDBMongoConnection.model('users', schema);
