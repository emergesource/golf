var express = require('express');
var router = express.Router();
var auth = require('../config/auth');

module.exports = function(passport) {

    /* GET home page. */
    router.get('/',  function(req, res, next) {
        res.render('index', { 
            title: 'golf',
            loggedIn: false 
        });
    });

    return router;
}
