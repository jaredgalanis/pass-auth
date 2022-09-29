const fs = require('fs');

module.exports = {
  development: {
    app: {
      port: process.env.AUTH_PORT,
      loginPath: process.env.AUTH_LOGIN,
      loginRedirectSuccess: process.env.AUTH_LOGIN_SUCCESS,
      loginRedirectFailure: process.env.AUTH_LOGIN_FAILURE,
      logoutPath: process.env.AUTH_LOGOUT,
      logoutRedirect: process.env.AUTH_LOGOUT_REDIRECT,
      elideUrl: process.env.ELIDE_API_URL,
      elideNamespace: process.env.ELIDE_NAMESPACE,
      emberUrl: process.env.EMBER_URL,
      emberPath: process.env.EMBER_ROOT_URL,
      serviceUrls: {
        fcrepoUrl: process.env.FCREPO_URL,
        userServiceUrl: process.env.USER_SERVICE_URL,
        elasticSearchUrl: process.env.ELASTIC_SEARCH_URL,
        schemaServiceUrl: process.env.SCHEMA_SERVICE_URL,
        policyServiceUrl: process.env.POLICY_SERVICE_URL,
        doiServiceUrl: process.env.DOI_SERVICE_URL,
        downloadServiceUrl: process.env.DOWNLOAD_SERVICE_URL,
      },
    },
    passport: {
      strategy: process.env.PASSPORT_STRATEGY,
      multiSaml: {
        jhu: {
          entryPoint: process.env.SAML_ENTRY_POINT,
          cert: process.env.SIGNING_CERT_IDP,
        },
        sp: {
          acsUrl: process.env.ACS_URL,
          identifierFormat: process.env.IDENTIFIER_FORMAT,
          issuer: process.env.SAML_ISSUER,
          decryptionPvk: fs.readFileSync('sp-private.key', 'utf-8'),
          decryptionCert: fs.readFileSync('sp-cert.pem', 'utf-8'),
          signingCert: process.env.SIGNING_CERT_SP,
          forceAuthn: process.env.FORCE_AUTHN,
          signatureAlgorithm: 'sha256',
        },
      },
    },
  },
};
