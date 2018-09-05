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

export const deleteModule = (userId, moduleIndex) => {
  const User = mongoose.model('users');
  const unsetObject = {};
  unsetObject['modules.' + moduleIndex] = null;

  return new Promise(resolve => {
    User.findByIdAndUpdate(
      userId,
      {
        $set: unsetObject,
      },
      () => {
        User.findByIdAndUpdate(
          userId,
          {
            $pull: { modules: null },
          },
          { multi: true },
          () => resolve(),
        );
      },
    );
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
  return {
    ...RAWUser,
    socials: RAWUser.socials.map(singleSocial => ({ url: singleSocial.url, type: singleSocial.socialType })),
  };
};
