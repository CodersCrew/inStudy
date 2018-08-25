const mongoose = require('mongoose');
const Cities = mongoose.model('cities');
const Universities = mongoose.model('universities');

module.exports.fetchCities = () => Cities.find({});

module.exports.fetchUniversities = city =>
  Universities.find({ city: new mongoose.mongo.ObjectId(city) });
