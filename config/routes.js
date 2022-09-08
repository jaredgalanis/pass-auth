const ensureAuthenticated = require('../middleware/ensure-auth');

module.exports = function (app, passport) {
  app.get('/login', function (req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/app/moo');
    } else {
      res.render('login', {
        user: null,
      });
    }
  });

  app.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/app/auth-callback',
      failureRedirect: '/login',
    })
  );

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
  });

  app.get('/authenticated', ensureAuthenticated, (req, res) => {
    res.json({
      access_token: 'tokenized!',
      user: req.user,
    });
  });
};
