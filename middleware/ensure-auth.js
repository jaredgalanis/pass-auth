module.exports = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect(process.env.AUTH_LOGIN);
};
