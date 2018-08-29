const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports.addNewModule = function(module, userId) {
  return User.findByIdAndUpdate(userId, {
    $addToSet: {
      modules: module,
    },
  });
};

module.exports.changeBasicUserData = function(basic, userId) {
  basic.socials = basic.socials.map(singleSocial => ({
    url: singleSocial.url,
    socialType: singleSocial.type,
  }));

  return User.findByIdAndUpdate(userId, {
    $set: {
      ...basic,
    },
  });
};

module.exports.mapUserToView = function(RAWUser) {
  RAWUser = RAWUser.toObject();
  RAWUser.socials = [...RAWUser.socials];
  RAWUser.socials = RAWUser.socials.map((singleSocial) => ({url: singleSocial.url, type: singleSocial.socialType}))
  return RAWUser;
};
