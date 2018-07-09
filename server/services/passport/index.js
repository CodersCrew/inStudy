const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');
const googleStrategy = require('./googleStrategy')(User);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (e) {
    console.error(`Error with User deserializing: ${e.message}`);
  }
});

passport.use(new GoogleStrategy(googleStrategy.config, googleStrategy.callback));
