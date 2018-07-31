const mongoose = require('mongoose');
const User = mongoose.model('users');

const createUser = ({ photos, id, name, emails, description = '', socials = [] }) => ({
  googleId: id,
  image: photos[0].value.split('?sz=')[0],
  firstName: name.givenName,
  lastName: name.familyName,
  email: emails[0].value,
  description,
  socials,
});

function DBConnector() {
  this.connection = null;
  // this.context = context;
}

DBConnector.prototype.prepare = context => {};
DBConnector.prototype.getUser = googleId => User.findOne({ googleId });

DBConnector.prototype.putUser = profile =>
  User.findOneAndUpdate({ googleId: profile.id }, createUser(profile), { new: true });

DBConnector.prototype.setUser = profile => new User(createUser(profile)).save();

module.exports = new DBConnector();
