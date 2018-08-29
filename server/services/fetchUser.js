import mongoose from 'mongoose';

export const addNewModule = function(module, userId) {
  return mongoose.model('users').findByIdAndUpdate(userId, {
    $addToSet: {
      modules: module,
    },
  });
};

export const changeBasicUserData = function(basic, userId) {
  basic.socials = basic.socials.map(singleSocial => ({
    url: singleSocial.url,
    socialType: singleSocial.type,
  }));

  return mongoose.model('users').findByIdAndUpdate(userId, {
    $set: {
      ...basic,
    },
  });
};

export const mapUserToView = RAWUser => {
  RAWUser = RAWUser.toObject();
  RAWUser.socials = [...RAWUser.socials];
  RAWUser.socials = RAWUser.socials.map(singleSocial => ({ url: singleSocial.url, type: singleSocial.socialType }));
  return RAWUser;
};
