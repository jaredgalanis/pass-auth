module.exports = {
  development: {
    app: {
      port: process.env.AUTH_PORT || 3000,
      loginPath: process.env.AUTH_LOGIN || '/login',
      loginRedirectSuccess:
        process.env.AUTH_LOGIN_SUCCESS || '/app/auth-callback',
      loginRedirectFailure: process.env.AUTH_LOGIN_FAILURE || '/login',
      logoutPath: process.env.AUTH_LOGOUT || '/logout',
      logoutRedirect: process.env.AUTH_LOGOUT_REDIRECT || '/login',
      elideUrl: process.env.ELIDE_API_URL,
      elideNamespace: process.env.ELIDE_NAMESPACE,
      emberUrl: process.env.EMBER_URL,
      emberPath: process.env.EMBER_ROOT_URL || '/app/',
    },
    passport: {
      strategy: process.env.PASSPORT_STRATEGY,
    },
  },
};
