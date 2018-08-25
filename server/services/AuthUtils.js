const logoutUser = (_, {}, req) => {
  req.logout();
};

const getUser = (_, { token }, req) => {
  const { googleId, image } = req.user;

  return Promise.resolve({ googleId, image });
};

module.exports = {
  logoutUser,
  getUser,
};
