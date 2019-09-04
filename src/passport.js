const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (user) {
      user.password = null;
    }
    done(err, user);
  });
});

// Local strategy
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'User does not exist' });

      user.verifyPassword(password, (err, match) => {
        if (err) return done(err);
        if (!match) return done(null, false, { message: 'Invalid password' });

        user.password = null;
        return done(null, user);
      });
    });
  })
);
