const keys = require('../../config/keys');

module.exports = User => ({
  config: {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true,
  },
  callback: async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    const existingUser = await User.findOne({ googleId: profile.id });
    const user =
      existingUser ||
      (await new User({
        googleId: profile.id,
        image: profile.photos[0].value.split('?sz=')[0],
      }).save());

    return done(null, user);
  },
});
