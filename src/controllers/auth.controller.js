const passport = require('passport');
const User = require('../models/User');
const testPasswordStrength = require('../helpers/testPasswordStrength');

// Controller for signup
async function signup(req, res, next) {
  // Check if the required data is missing
  if (!req.body.email || !req.body.password) {
    return res.status(400).send('Missing data');
  }

  try {
    // Check if user exist and password strenght
    const checkUserExist = User.findOne({ email: req.body.email });
    const testPassword = testPasswordStrength(req.body.password);

    const [userMatch, passwordStrenght] = await Promise.all([
      checkUserExist,
      testPassword
    ]);

    if (userMatch) {
      return res.status(400).send('Email exist');
    }

    if (passwordStrenght !== 'strong') {
      return res.status(400).send('Invalid password');
    }

    // If all is ok create the user
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      fristname: req.body.fristname || '',
      lastname: req.body.lastname || ''
    });

    // Save it in the db
    let user = await newUser.save();
    user.password = req.body.password;
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

// Controller for login
function login(req, res, next) {
  // Check if the required data is missing
  if (!req.body.email || !req.body.password) {
    return res.status(400).send('Missing credentials');
  }

  // Login using the passport local strategy
  passport.authenticate('local', (error, user, info) => {
    // Check for errors
    if (error) {
      return next(error);
    }
    // Check if the LocalStrategy does not return a user
    if (!user) {
      return res.status(400).send(info.message);
    }

    // If all is ok login the user
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }

      // If remember is set, set cookie expiration in 30 days
      let sessionCookieMaxAge = 30 * 24 * 60 * 60 * 1000;
      req.session.cookie.maxAge = req.body.remember
        ? sessionCookieMaxAge
        : null;

      res.status(200).send('Login success');
    });
  })(req, res, next);
}

// Controller for logout
function logout(req, res) {
  req.logout();
  res.status(200).send('Logout success');
}

const authController = {
  signup,
  login,
  logout
};

module.exports = authController;
