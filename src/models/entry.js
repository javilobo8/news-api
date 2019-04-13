const mongoose = require('mongoose');

const collectionName = 'entries';

const EntrySchema = mongoose.Schema({
  entryId: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  url: { type: String },
  targetId: { type: mongoose.Schema.Types.ObjectId, ref: 'targets', required: true },
}, { versionKey: false, timestamps: true, collectionName });

module.exports = mongoose.model(collectionName, EntrySchema);
