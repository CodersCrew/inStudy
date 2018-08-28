import keys from '../../config/keys';
import InitializeUserAccount from './../InitializeUserAccount';

export default User => ({
  config: {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true,
  },
  callback: async (accessToken, refreshToken, profile, done) => {
    new InitializeUserAccount(profile).prepare().then(user => done(null, user));
  },
});
