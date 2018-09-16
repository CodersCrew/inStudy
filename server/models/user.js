import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
  googleId: String,
  image: String,
  firstName: String,
  lastName: String,
  email: String,
  description: String,
  color: String,
  socials: [
    {
      url: String,
      socialType: String,
      _id: false,
    },
  ],
  initiatives: [Schema.Types.ObjectId],
  modules: [{}],
  shortUrl: String,
});

module.exports = mongoose.model('users', schema);
