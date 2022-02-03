const User = require('../models/user');

const tobi = new User({name: 'tobi', pass: 'aaaa', age: '2'});

tobi.save((err) => {
  if (err) throw err;
  console.log('user id %d', tobi.id);
});

User.getByName('tobi', (err, user) => {
  if (err) throw err;
  console.log('User is %s', user.name);
})