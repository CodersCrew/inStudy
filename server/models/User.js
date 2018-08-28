import mongoose from 'mongoose';
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
      link: String,
      iconName: String,
    },
  ],
  initiatives: [Schema.Types.ObjectId],
});

export default {
  name: 'users',
  schema: userSchema,
};
