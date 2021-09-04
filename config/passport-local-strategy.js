const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user || password != user.password) {
        console.log("Invalid username or password");
        return done(null, false);
        //   return done(null, false, { message: 'Incorrect username.' });
      }
      return done(null, user);
    });
  }
));



passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.checkAuthentication = function (req, res, next) {
  if(req.isAuthenticated())
  {
    // if user is signin
    return next();
  }
  // if user in not signin
  return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = function (req, res, next) {
  if(req.isAuthenticated())
  {
    res.locals.user = req.user;
  }
  return next();
}

module.exports = passport;