import mongoose from 'mongoose';
const { Schema } = mongoose;

const universitySchema = new Schema({
  name: String,
});

export default {
  name: 'universities',
  schema: universitySchema,
};
