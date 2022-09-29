const ensureAuthenticated = require('../middleware/ensure-auth');

module.exports = function (app, apiProxy, config) {
  app.all(
    `/${config.app.passCoreNamespace}*`,
    ensureAuthenticated,
    function (req, res) {
      apiProxy.web(req, res, { target: config.app.passCoreUrl });
    }
  );

  app.all(
    `${config.app.passUiPath}*`,
    ensureAuthenticated,
    function (req, res) {
      apiProxy.web(req, res, { target: config.app.passUiUrl });
    }
  );

  /////////////////////////////////// PROXIED SERVICES IN PASS DOCKER ///////////////////////////////

  apiProxy.on('proxyReq', function (proxyReq, req) {
    const user = req.user;

    proxyReq.setHeader('Displayname', user.shibbolethAttrs.displayName);
    proxyReq.setHeader('Mail', user.shibbolethAttrs.email);
    proxyReq.setHeader('Eppn', user.shibbolethAttrs.eppn);
    proxyReq.setHeader('Givenname', user.shibbolethAttrs.givenName);
    proxyReq.setHeader('Sn', user.shibbolethAttrs.surname);
    proxyReq.setHeader('Affiliation', user.shibbolethAttrs.scopedAffiliation);
    proxyReq.setHeader('Employeenumber', user.shibbolethAttrs.employeeNumber);
    proxyReq.setHeader('unique-id', user.shibbolethAttrs.uniqueId);
    proxyReq.setHeader('employeeid', user.shibbolethAttrs.employeeIdType);

    // this is necessary because the bodyParser middleware and http-proxy
    // do not play well together with POST requests
    // https://github.com/http-party/node-http-proxy/issues/180
    if (req.body) {
      let bodyData = JSON.stringify(req.body);
      // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      // stream the content
      proxyReq.write(bodyData);
    }
  });

  app.all('/fcrepo/*', ensureAuthenticated, function (req, res) {
    const base64Creds = Buffer.from(
      `${process.env.PASS_FEDORA_USER}:${process.env.PASS_FEDORA_PASSWORD}`
    ).toString('base64');

    req.headers['Authorization'] = `Basic ${base64Creds}`;

    apiProxy.web(req, res, { target: config.app.serviceUrls.fcrepoUrl });
  });

  app.all('/pass-user-service/*', ensureAuthenticated, function (req, res) {
    apiProxy.web(req, res, { target: config.app.serviceUrls.userServiceUrl });
  });

  app.all('/es/*', ensureAuthenticated, function (req, res) {
    // this is necessary because the proxy server by default will
    // append the route to the target and that results in an invalid
    // path for elastic search
    req.url = '';

    apiProxy.web(req, res, { target: config.app.serviceUrls.elasticSearchUrl });
  });

  app.all('/schemaservice/*', ensureAuthenticated, function (req, res) {
    apiProxy.web(req, res, { target: config.app.serviceUrls.schemaServiceUrl });
  });

  app.all('/policyservice/*', ensureAuthenticated, function (req, res) {
    apiProxy.web(req, res, { target: config.app.serviceUrls.policyServiceUrl });
  });

  app.all('/doiservice/*', ensureAuthenticated, function (req, res) {
    apiProxy.web(req, res, { target: config.app.serviceUrls.doiServiceUrl });
  });

  app.all('/downloadservice/*', ensureAuthenticated, function (req, res) {
    apiProxy.web(req, res, {
      target: config.app.serviceUrls.downloadServiceUrl,
    });
  });
};
