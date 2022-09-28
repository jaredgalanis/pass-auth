module.exports = function (passport, config) {
  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });

  const strategies = {
    multiSaml: require('./strategies/multi-saml-strategy')(config),
  };

  const strategy = strategies[config.passport.strategy];

  passport.use(strategy);

  return strategy;
};
