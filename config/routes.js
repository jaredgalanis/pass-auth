module.exports = function (app, passport, config) {
  app.get(
    config.app.loginPath,
    passport.authenticate('saml', {
      successRedirect: config.app.loginRedirectSuccess,
      failureRedirect: config.app.loginRedirectFailure,
      scope: ['email profile'],
    })
  );

  app.get(config.app.logoutPath, function (req, res) {
    req.logout();
    res.redirect(config.app.logoutRedirect);
  });

  app.post(
    config.passport[config.passport.strategy].sp.acsUrl,
    passport.authenticate('saml', {
      successRedirect: config.app.loginRedirectSuccess,
      failureRedirect: config.app.loginRedirectFailure,
    })
  );

  app.get('/authenticated', (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).send({
        user: req.user,
      });
    } else {
      res.status(401).send('You are not authenticated');
    }
  });
};
