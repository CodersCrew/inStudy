const mongoose = require('mongoose');
const Categories = mongoose.model('categories');

module.exports.fetchCategories = function() {
  return Categories.find({});
};
