const redis = require('redis');
const bcrypt = require('bcrypt');

const db = redis.createClient(6379, '127.0.0.1');

class User {

  constructor(obj) {
    if (!obj || typeof obj !== 'object') return null;
    Object.keys(obj).forEach(key => {
      this[key] = obj[key];
    });
  }

  hashPassword(cb) {
    let user = this;
    bcrypt.genSalt(12, (err, salt) => {
      if (err) return cb(err);
      user.salt = salt;
      bcrypt.hash(user.pass, salt, (err, hash) => {
        if (err) return cb(err);
        user.pass = hash;
        cb();
      })
    })
  }

  save(cb) {
    if (this.id) {
      this.update(cb);
      return;
    }

    var user = this;
    db.incr('user:ids', (err, id) => {
      if (err) return cb(err);
      user.id = id;
      user.hashPassword((err) => {
        if (err) return cb(err);
        user.update(cb);
      });
    });
  }

  update(cb) {
    const user = this;
    const id = user.id;
    db.set('user:id:' + user.name, id, (err) => {
      if (err) return cb(err);
      db.hmset('user:' + id, user, (err) => cb(err));
    });
  }

  static get(id, cb) {
    db.hgetall('user:' + id, (err, user) => {
      if (err) return cb(err);
      cb(null, new User(user));
    });
  }

  static getId(name, cb) {
    db.get('user:id:' + name, cb);
  }

  static getByName(name, cb) {
    User.getId(name, (err, id) => {
      if (err) return cb(err);
      User.get(id, cb);
    })
  }

  static authenticate(name, pass, cb) {
    User.getByName(name, (err, user) => {
      if (err) return cb(err);
      if (!user || !user.id) cb();
      bcrypt.hash(pass, user.salt, (err, hash) => {
        if (err) return cb(err);
        if (hash == user.pass) return cb(null, user);
        cb();
      })
    })
  }

}

module.exports = User;

