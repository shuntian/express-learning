const User = require("../models/user");

exports.form = (req, res, next) => {
  res.render('register', {title: 'Register'});
}

exports.submit = (req, res, next) => {
  const { name, pass } = req.body;
  const data = { name, pass };
  User.getByName(data.name, (err, user) => {
    if (err) return next(err);
    if (user.id) {
      res.error("Username already taken");
      res.redirect('back');
      return;
    }
    user = new User(data);
    user.save((err) => {
      if (err) return next(err);
      req.session.uid = user.id;
      res.redirect('/content');
    })
  })
}