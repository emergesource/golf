var express = require('express');
var router = express.Router();

module.exports = function(passport) {

    router.get('/signin', function(req, res, next) {
      res.render('auth/signin', { title: 'Sign in'});
    });

    router.get('/login', function(req, res, next) {
      res.render('auth/login', { title: 'Sign in', message: req.flash('loginMessage') });
    });

    router.get('/signup', function(req, res, next) {
      res.render('auth/signup', { title: 'Sign up', message: req.flash('signupMessage') });
    });

    // process the signup form
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/auth/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the login form
    router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/auth/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
}
