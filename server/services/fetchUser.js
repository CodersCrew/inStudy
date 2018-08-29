import mongoose from 'mongoose';

export const addNewModule = (module, userId) => {
  return mongoose.model('users').findByIdAndUpdate(userId, {
    $addToSet: {
      modules: module,
    },
  });
};

export const updateModule = (module, userId, moduleIndex) => {
  const setObject = {};
  setObject['modules.' + moduleIndex] = module;

  return mongoose.model('users').findByIdAndUpdate(userId, {
    $set: setObject,
  });
};

export const changeBasicUserData = (basic, userId) => {
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
