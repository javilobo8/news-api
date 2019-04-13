const mongoose = require('mongoose');
const Promise = require('bluebird');
const logger = require('../utils/logger')('Models');

mongoose.Promise = Promise;

const defaultMongooseOptions = {
  useNewUrlParser: true,
};

class Models {
  constructor() {
    this.mongoose = mongoose;

    this.mongoose.connection.on('connected', () => {
      logger.log('connected');
    });

    this.mongoose.connection.on('disconnected', () => {
      logger.log('disconnected');
    });

    this.Entry = require('./entry');
    this.Target = require('./target');
    this.Task = require('./task');
  }

  connect(uri, options = {}) {
    return this.mongoose.connect(uri, Object.assign({}, defaultMongooseOptions, options));
  }

  disconnect() {
    this.mongoose.disconnect();
  }
}

module.exports = new Models();
