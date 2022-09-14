const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios').default;

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

  passport.use(
    new LocalStrategy(async function (username, password, done) {
      if (process.env.PASSWORD !== password) {
        return done(null, false, {
          message: 'Incorrect username or password.',
        });
      }

      try {
        const {
          data: {
            data: [user],
          },
        } = await axios.get(
          `${config.app.elideUrl}${config.app.elideNamespace}user?filter[user]=username==${username}`
        );

        if (!user) {
          return done(null, false, {
            message: 'Incorrect username or password.',
          });
        }

        return done(null, {
          id: user.id,
          username: username,
          ...user.attributes,
        });
      } catch (err) {
        console.error(JSON.stringify(err));
        return done(null, false, {
          message: err.message,
        });
      }
    })
  );
};
