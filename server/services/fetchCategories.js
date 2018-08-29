import mongoose from 'mongoose';

module.exports.fetchCategories = function() {
  return Categories.find({});
};
