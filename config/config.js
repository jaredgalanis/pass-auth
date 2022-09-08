module.exports = {
  development: {
    app: {
      port: process.env.PORT || 3000,
      elideUrl: process.env.ELIDE_URL,
      emberUrl: process.env.EMBER_URL,
    },
    passport: {
      strategy: process.env.PASSPORT_STRATEGY,
    },
  },
};
