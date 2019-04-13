(async () => {
  if (global.__TEST__) {
    return;
  }

  const models = require('./models');
  const config = require('../config');

  models.connect(config.mongo.uri);
})();
