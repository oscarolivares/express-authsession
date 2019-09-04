// Middleware that check if an user is authenticated
exports.authVerify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('You must login to continue');
};
