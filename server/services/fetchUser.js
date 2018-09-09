import mongoose from 'mongoose';

export const getUserData = userId =>
  new Promise((resolve, reject) => {
    mongoose.model('users').findById(userId, (error, user) => {
      if (error) {
        reject(error.name);
      } else {
        resolve(user);
      }
    });
  });

export const addNewModule = (module, userId) => mongoose.model('users').findByIdAndUpdate(userId, {
  $addToSet: {
    modules: module,
  },
});

export const updateModule = (module, userId, moduleIndex) => {
  const setObject = {};
  setObject[`modules.${moduleIndex}`] = module;

  return mongoose.model('users').findByIdAndUpdate(userId, {
    $set: setObject,
  });
};

export const deleteModule = (userId, moduleIndex) => {
  const User = mongoose.model('users');
  const unsetObject = {};
  unsetObject[`modules.${moduleIndex}`] = null;

  return new Promise((resolve) => {
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
  return mongoose.model('users').findByIdAndUpdate(userId, {
    $set: {
      ...basic,
    },
  });
};

export const mapUserToView = RAWUser => RAWUser.toObject();
