const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/userModel');
const config = require('../config/config');

module.exports = function(passport) {
    let opts = {};
    opts.secretOrKey = config.secret;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");    
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUserById(jwt_payload._doc._id, (err, user) => {
            if(err) {
                return done(err, false);
            }

            if (user) {
                return done(null, user);
            } else {
                return done (null, false);
            }
        });
    }));
}
