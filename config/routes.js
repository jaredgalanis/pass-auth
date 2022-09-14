const ensureAuthenticated = require('../middleware/ensure-auth');

module.exports = function (app, passport, config) {
  app.get(config.app.loginPath, function (req, res) {
    if (req.isAuthenticated()) {
      res.redirect(config.app.emberPath);
    } else {
      res.render('login', {
        user: null,
      });
    }
  });

  app.post(
    config.app.loginPath,
    passport.authenticate('local', {
      successRedirect: config.app.loginRedirectSuccess,
      failureRedirect: config.app.loginRedirectFailure,
    })
  );

  app.get(config.app.logoutPath, function (req, res) {
    req.logout();
    res.redirect(config.app.logoutRedirect);
  });

  app.get('/authenticated', ensureAuthenticated, (req, res) => {
    res.json({
      access_token: 'dG9rZW5pemVkIQ==',
      user: req.user,
    });
  });
};
