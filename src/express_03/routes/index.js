exports.index = (req, res) => {
  res.render('index', {title: 'index'});
}

exports.content = (req, res) => {
  res.render('content', {title: 'content'});
}
