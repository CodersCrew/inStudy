const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
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

mongoose.model('users', userSchema);
