const mongoose = require('mongoose');
const User = mongoose.model('users');

function DBConnector() {
  this.connection = null;
  // this.context = context;
  console.log(this.context, 'yy')
}

DBConnector.prototype.prepare = (context) => {

};
DBConnector.prototype.getUser = (googleId) => {
  return User.findOne({
    googleId
  })
};

DBConnector.prototype.putUser = (profile) => {
  const { photos, id } = profile;
  return User.findOneAndUpdate({
    googleId: id,
  }, {
    image: photos[0].value.split('?sz=')[0],
  }, {
    new: true
  })
};

DBConnector.prototype.setUser = (profile) => {
  const { photos, id } = profile;
  return new User({
    googleId: id,
    image: photos[0].value.split('?sz=')[0]
  }).save();
};

module.exports = new DBConnector();
