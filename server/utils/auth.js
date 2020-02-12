const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('koa-passport');
const User = require('../models/UserModel');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({username: username}).then((user) => {
        if (!user) {return done(null, false, {message: 'No user has been found with that email'})}
        bcrypt.compare(password, user.password, (err, isMatch) => { // ----> Match password <----------------------------
          if (err) { return done(null, false, {error: err}) }
          if (isMatch) { return done(null, user); }
          return done(null, false, {message: 'Password Incorrect'});
        });
      });
    })
  );
  passport.serializeUser(function (user, done) { done(null, user.id) });
  passport.deserializeUser((id, done) => { User.findById(id, (err, user) => { done(err, user); }); });
};
