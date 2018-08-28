import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import mongoose from 'mongoose';
import createGoogleStrategy from './googleStrategy';

export default () => {
  const User = mongoose.model('users');
  const googleStrategy = createGoogleStrategy(User);

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (e) {
      console.error(`Error with User deserializing: ${e.message}`);
    }
  });

  passport.use(new Strategy(googleStrategy.config, googleStrategy.callback));
};
