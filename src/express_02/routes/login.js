const User = require("../models/user");

exports.form = (req, res) => {
  res.render('login', {title: 'Login'});
}

exports.submit = (req, res, next) => {
  const { name, pass } = req.body;
  const data = { name , pass };
  User.authenticate(data.name, data.pass, (err, user) => {
    if (err) return next(err);
    if (user) {
      req.session.uid = user.id;
      res.redirect('/content');
    } else {
      res.error("Sorry! invalid credentials");
      res.redirect('back');
    }
  })
}

exports.logout = (req, res) => {
  res.render('index', {title: 'index'});
}