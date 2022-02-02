const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shuntian');

const schema = new mongoose.Schema({
  name: String,
  path: String
});

module.exports = mongoose.model('Photo', schema);
