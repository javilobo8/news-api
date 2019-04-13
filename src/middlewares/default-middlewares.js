const bodyParser = require('body-parser');
const helmet = require('helmet');

module.exports = (app) => {
  app.use(helmet());
  app.use(bodyParser.json({ extended: true }));
};
