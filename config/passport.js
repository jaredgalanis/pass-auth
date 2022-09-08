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
        const { data } = await axios.get(
          `${config.app.elideUrl}api/v1/user?filter[user]=username==${username}`
        );

        console.log(data);

        if (data.data.length === 0) {
          return done(null, false, {
            message: 'Incorrect username or password.',
          });
        }

        const user = data.data[0];

        return done(null, {
          id: 1,
          username: username,
          firstName: user.attributes.firstName,
          lastName: user.attributes.lastName,
        });
      } catch (err) {
        console.log(err);
      }
    })
  );
};
