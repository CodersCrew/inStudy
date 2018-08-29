import mongoose from 'mongoose';

module.exports.fetchCategories = function() {
  return mongoose.model('categories').find({});
};
