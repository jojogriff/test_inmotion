const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const jwt = require('jwt-simple');
//need to move the secret file to a secret location, sorta
//maybe something like this: var secret = require("../../data/passport_data")
const secret = 'badIdeaToPutSecretInCode2017';


// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({ email }, function(err, user) {
    if (err) { return done(err); }
    // User does not exist
    if (!user) { return done(null, false); }
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      // User exists. Password mismatch
      if (!isMatch) { return done(null, false); }
      // Correct login
      return done(null, user);
    });
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.id, function(err, user) {
    if (err) return done(err, false);
    if (user) return done(null, user);
    else return done(null, false);
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);

module.exports.jwtOptions = jwtOptions;
module.exports = passport;
