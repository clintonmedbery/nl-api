const passport = require('passport');
const passportService = require('./passport');
const AuthenticationController = require('../controllers/authenticationController');

var requireAuth = passport.authenticate('jwt', {session: false});
var requireLogin = passport.authenticate('local', {session: false});

import express from 'express';
let router = express.Router();

function protect(req, res, next) {
    res.send("Here's the secret!");
}

router.route('/protected')
    .get(requireAuth, protect);

// Auth Routes
router.route('/signup').post(AuthenticationController.signup);
router.route('/signin').post(requireLogin, AuthenticationController.signin);

// Todo Routes
// router.route('/users/:user_id/todos')
//     .post(requireAuth, TodosController.create)
//     .get(requireAuth, TodosController.index);
//
// router.route('/users/:user_id/todos/:todo_id')
//     .delete(requireAuth, TodosController.destroy);

if(process.env.NODE_ENV === "local"){
    console.log("Connecting to local Postgres");
}

module.exports = router;
