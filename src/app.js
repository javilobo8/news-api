require('./globals');

const express = require('express');

const services = require('./services');

const app = express();

require('./database');
require('./middlewares/default-middlewares')(app);

const container = {
  services,
};

require('./controllers')(app, container);

module.exports = app;
