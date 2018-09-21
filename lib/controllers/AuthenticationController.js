import {User} from '../services/db';
import * as sequelize from "sequelize";
import isEmail from 'validator/lib/isEmail';
import {ERRORS} from "../utilities/constants";
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
    var timestamp = new Date().getTime();
    return jwt.encode({
        sub: user.id,
        iat: timestamp
    }, config.secret);
}

exports.signin = function(req, res, next) {
    var user = req.user;
    res.send({token: tokenForUser(user), userId: user.id});
};

exports.me = function(req, res, next) {
    var user = req.user;
    res.send({
        id: user.id,
        email: user.email,
        userLevel: user.level,
        userExp: user.exp,
        userMaxStage: user.maxStage
    });
};

exports.signup = function(req, res, next) {
    User.findOne({where:{ email: { [sequelize.Op.eq]: req.body.email } }})
        .then(function (user) {
            if(!user){
                let errors = [];
                if(!isEmail(req.body.email)){
                    errors.push(ERRORS.INVALID_EMAIL);
                }
                if(req.body.password.includes(" ")){
                    errors.push(ERRORS.PASSWORD_WHITESPACE);
                }
                if(req.body.password.length < 8){
                    errors.push(ERRORS.INVALID_PASSWORD);
                }
                if(errors.length > 0){
                    res.status(404).json({errors: errors});
                    return;
                }
                User.create({
                    // username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    maxStage: 1,
                    level: 1,
                    exp: 0
                })
                .then(function(user){
                    res.send(200, {'token': tokenForUser(user),
                        'userId':    user.id,
                        'email': user.email });
                });
            } else {
                res.status(404).json('Username already exist!');
            }
        })
        .catch(function (err) {
            res.send('Error creating user: ', err.message);
        });
};

