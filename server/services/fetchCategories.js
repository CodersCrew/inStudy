import mongoose from 'mongoose';

module.exports.fetchCategories = () => mongoose.model('categories').find({});
