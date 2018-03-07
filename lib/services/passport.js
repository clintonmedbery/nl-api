
import passport from 'passport';
import * as passportJwt from 'passport-jwt';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import {User} from "./db"
const config = require('../config');
import * as sequelize from 'sequelize';

var localOptions = {
    usernameField: 'email'
};

var localStrategy = new LocalStrategy(localOptions, function(email, password, done){

    User.findOne({where:{ email: { [sequelize.Op.eq]: email } }}).then(function (user) {
        if(!user){
            return done(null, false);
        }
        bcrypt.compare(password, user.password, function(error, isMatch) {
            if(error){
                return done(error);
            }
            if(!isMatch){
                return done(null, false);
            }
            return done(null, user);
        });
    });
});

var jwtOptions = {
    secretOrKey: config.secret,
    jwtFromRequest: passportJwt.ExtractJwt.fromHeader('authorization')
};

var jwtStrategy =  new LocalStrategy(jwtOptions, function(payload, done){
    User.findById(payload.sub, function(error, user){
        if(error) {
            return done(error, false);
        }
        if(user){
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

passport.use(jwtStrategy);
passport.use(localStrategy);
