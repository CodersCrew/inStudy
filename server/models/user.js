import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
  googleId: String,
  image: String,
  firstName: String,
  lastName: String,
  email: String,
  description: String,
  socials: [
    {
      url: String,
      socialType: String,
      _id: false,
    },
  ],
  initiatives: [Schema.Types.ObjectId],
  modules: [{}],
});

module.exports = mongoose.model('users', schema);
