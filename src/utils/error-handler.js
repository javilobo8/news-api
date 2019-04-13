const Boom = require('boom');

const logger = require('./logger');

class ErrorHandler {
  constructor(context, options = { logging: true }) {
    this.logger = logger(context);
    this.options = options;
  }

  _logError(error) {
    if (this.options.logging) {
      this.logger.error(error);
    }
  }

  sendError(res) {
    return (error) => {
      this._logError(error);
      const boom = Boom.internal(error);
      res.status(boom.output.statusCode).send(boom.output.payload);
    };
  }

  sendUnauthorized(res) {
    return (error) => {
      this._logError(error);
      const boom = Boom.unauthorized(error);
      res.status(boom.output.statusCode).send(boom.output.payload);
    };
  }
}

module.exports = ErrorHandler;
