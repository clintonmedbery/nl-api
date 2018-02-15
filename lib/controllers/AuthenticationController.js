import {User} from '../services/db';
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
    res.send({token: tokenForUser(user), user_id: user._id});

};

exports.signup = function(req, res, next) {
    User.findOne({where:{ email: req.body.email }})
        .then(function (user) {
            if(!user){
                User.create({
                    // username: req.body.username,
                    password: req.body.password,
                    email: req.body.email
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

