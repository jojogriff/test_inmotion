const User = require('../models/user');
const jwt = require('jwt-simple');
const secret = 'badIdeaToPutSecretInCode2017';
const ExtractJwt = require('passport-jwt').ExtractJwt;


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
  secretOrKey: secret
};
const generateJWT = function (userID) {
  var payload = {id: userID};
  return jwt.encode(payload, jwtOptions.secretOrKey);
}

exports.login = function(req, res, next) {
  const { email, _id } = req.user;
  res.json({
    success: true,
    user: {
      _id,
      email,
      token: generateJWT(_id)
    }
  });
};

exports.register = function(req, res, next) {
  const { email, password } = req.body;
  User.findOne({email}, function (err, user) {
    if (err) { return next(err); }
    if (user) {
      res.json({
        success: true,
        message: "User with that email already taken."
      }).end();
    } else {
      User.create({email, password}, function (err, newUser) {
        const {email, _id} = newUser;
        res.status(201).json({
            success: true,
            message: 'Created account',
            user: {
              _id,
              email,
              token: generateJWT(_id)
            }
        }).end();
      });
    }
  });
};
