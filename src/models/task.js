const mongoose = require('mongoose');

const collectionName = 'tasks';

const TaskSchema = mongoose.Schema({
  name: { type: String },
  description: { type: String },
  cron: { type: String },
  active: { type: Boolean, default: false },
  startOnCreate: { type: Boolean, default: false },
  targets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'targets',
    required: true,
  }],
  emails: [String],
}, { versionKey: false, timestamps: true, collectionName });

module.exports = mongoose.model(collectionName, TaskSchema);
