const keys = require('../../config/keys');
const InitializeUserAccount = require('./../InitializeUserAccount');
module.exports = User => ({
  config: {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true,
  },
  callback: async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    // new InitializeUserAccount(profile)
    //   .prepare()
    //   .then(user => done(null, user));
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
