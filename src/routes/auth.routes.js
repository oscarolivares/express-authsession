const Router = require('express').Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

Router.post('/signup', authController.signup);
Router.post('/login', authController.login);
Router.get('/logout', authMiddleware.authVerify, authController.logout);

// For test
Router.get('/user-info', authMiddleware.authVerify, (req, res) => {
  res.json(req.user);
});

module.exports = Router;
