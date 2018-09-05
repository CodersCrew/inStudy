import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
  user: Schema.Types.ObjectId,
  role: {
    type: String,
    default: 'Członek inicjatywy',
  },
  roleDescription: String,
});

mongoose.model('member', schema);

module.exports = schema;
