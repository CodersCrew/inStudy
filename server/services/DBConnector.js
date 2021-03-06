import mongoose from 'mongoose';
import mailSender, { USER_REGISTER_EMAIL } from './mail-sender';
// const User = mongoose.model('users');


const createUser = ({ photos, id, name, emails, description = '', socials = [] }) => ({
  googleId: id,
  image: photos[0].value.split('?sz=')[0],
  firstName: name.givenName,
  lastName: name.familyName,
  email: emails[0].value,
  description,
  socials,
});

class DBConnector {
  constructor() {
    this.connection = null;
    // this.context = context;
  }

  prepare = context => {};

  getUser = googleId => mongoose.model('users').findOne({ googleId });

  putUser = profile =>
    mongoose.model('users').findOneAndUpdate({ googleId: profile.id }, createUser(profile), { new: true });

  setUser = profile => mongoose.model('users')(createUser(profile)).save()
    .then((result) => {
      const { email, firstName } = result;
      console.log(result)
      mailSender(email, USER_REGISTER_EMAIL, { name: firstName })
      return result;
    })
}

export default new DBConnector();
