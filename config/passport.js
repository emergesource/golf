// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var models = require('../models');
var User = models.User; 

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });


    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        // User.findById(id, function(err, user) {
            // done(err, user);
        // });
        User.find({'id': id }).then(function(err, user) {
          done(err, user); 
        });
    });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {
    User.find({where: {'email': email}}).success(function(user) {
      if (user) {
        return done(null, false, req.flash(
          'signupMessage', 
          'That email is already taken.'
        ));
      } else {
          User.create({'email' : email, 'password': User.generateHash(password)}).then(function(user) {
            return done(null, user);
          });
        }
      });
  }));

  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) { // callback with email and password from our form
    User.find({where: {'email' : email}}).success(function(user) {

      if (!user || !user.authenticate(password)) {
        console.log('auth issue');
        return done(null, false, req.flash('loginMessage', 'Incorrect login information.'));
      } 

      return done(null, user); 
    }).error(function(err) {
        return done(err);
    });
  }));
    
    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }

};
