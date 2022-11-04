const { MultiSamlStrategy } = require('passport-saml');

module.exports = function (config) {
  return new MultiSamlStrategy(
    {
      passReqToCallback: true,
      getSamlOptions: (request, done) => {
        const { idpId } = request.params;

        const samlConfig = {
          callbackUrl: `https://pass.local/Shibboleth.sso/SAML2/POST/${idpId}`,
          ...config.passport.multiSaml[idpId],
          ...config.passport.multiSaml.sp,
        };

        return done(null, samlConfig);
      },
    },
    async (req, profile, done) => {
      return require('./setup-user')(req, profile, done, config);
    }
  );
};
