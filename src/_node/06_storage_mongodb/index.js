const mongoose = require('mongoose');
const { add } = require('./db/tasks');

const db = mongoose.connect('mongodb://127.0.0.1:27017/shuntian', (err) => {
  if (err) throw err;
  console.log('connect success');
});

add('abc', '牛气从天')