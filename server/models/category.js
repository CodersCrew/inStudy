import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: String,
});

export default {
  name: 'categories',
  schema: categorySchema,
};
