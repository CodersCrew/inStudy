const mongoose = require('mongoose');
const Cities = mongoose.model('cities');
const Universities = mongoose.model('universities');

module.exports.fetchCities = function() {
  return Cities.find({});
};

module.exports.fetchUniversities = function(city) {
  return Universities.find({ city });
}
