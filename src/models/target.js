const mongoose = require('mongoose');
const _ = require('lodash');

const httpClients = {
  AXIOS: 'axios',
  PUPPETEER: 'puppeteer',
};

const DEFAULT_MAX_RETRIES = 5;

const collectionName = 'targets';

const HttpConfig = {
  client: { type: String, enum: _.values(httpClients) },
  clientOptions: {
    maxRetries: { type: Number, default: DEFAULT_MAX_RETRIES },
    timeout: Number,
    waitPageLoad: Number, // ms
  },
  host: { type: String, required: true },
  path: { type: String, required: false, default: '' },
  method: { type: String, required: true },
  params: { type: Object, default: {} },
  body: { type: Object, default: null },
};

const TargetSchema = mongoose.Schema({
  name: { type: String, required: true },
  scrapperName: { type: String, required: true },
  description: String,
  tags: [String],
  http: HttpConfig,
}, { versionKey: false, timestamps: true, collectionName });

TargetSchema.static('HttpClients', httpClients);

module.exports = mongoose.model(collectionName, TargetSchema);
