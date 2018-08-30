import mongoose from 'mongoose';
const { Schema } = mongoose;

const initiativeSchema = new Schema({
  name: String,
  description: String,
  email: String,
  city: String,
  category: String,
  university: String,
  facebookUrl: String,
  shortUrl: String,
  modules: [{}],
  FBProfile: [{}],
  image: String,
});

export default {
  name: 'initiatives',
  schema: initiativeSchema,
};
