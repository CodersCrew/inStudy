import mongoose from 'mongoose';

export const fetchCities = () => mongoose.model('cities').find({});

export const fetchUniversities = cityId =>
  mongoose.model('universities').find({ city: new mongoose.mongo.ObjectId(cityId) });
