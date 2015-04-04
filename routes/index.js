var express = require('express');
var router = express.Router();
var auth = require('../config/auth');

module.exports = function(passport) {

    /* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });


    router.get('/profile', auth.isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user, // get the user out of session and pass to template
            title : 'profile'
        });
    });
    
    return router;
}
