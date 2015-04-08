var express = require('express');
var router = express.Router();
var auth = require('../config/auth');

module.exports = function(passport) {

  router.get('/profile', auth.isLoggedIn, function(req, res) {
    res.render('user/profile', {
      user : req.user, // get the user out of session and pass to template
      title : 'profile'
    });
  });

  return router;
}
