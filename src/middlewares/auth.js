const auth = require('basic-auth');

const config = require('../../config');
const ErrorHandler = require('../utils/error-handler');

const errorHandler = new ErrorHandler('auth-middleware');

function authMiddleware(req, res, next) {
  const authentication = auth(req);

  const isAuthenticated = (
    authentication
    && authentication.name === config.authentication.user
    && authentication.pass === config.authentication.pass
  );

  if (!isAuthenticated) {
    return errorHandler.sendUnauthorized(res)('Bad authentication, basic auth needed');
  }

  return next();
}

module.exports = authMiddleware;
