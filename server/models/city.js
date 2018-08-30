import mongoose from 'mongoose';
const { Schema } = mongoose;

const citySchema = new Schema({
  name: String,
});

export default {
  name: 'cities',
  schema: citySchema,
};
