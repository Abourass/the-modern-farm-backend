const mongoose = require('mongoose');

// Create Schema
const CounterSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  sequence_value: {
    type: Number,
  },
});

// Create collection and add Schema
module.exports = mongoose.model('counters', CounterSchema);
