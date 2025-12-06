const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  string1: String,
  string4: String,
  string2: Number,
  string3: Number,
  date: Date
});

module.exports = mongoose.model('Data', DataSchema);
