exports.error = (err, req, res, next) => {
  console.log(err.stack);
  var msg;
  switch(err.type) {
    case 'database': {
      msg = 'Server Unavailable';
      res.statusCode = 500;
      break;
    }
    default: {
      msg = 'Internal server Error';
      res.statusCode = 500;
    }
  }
  res.format({
    html: function() {
      res.render('5xx', {msg: msg, status: res.statusCode});
    },
    json: function() {
      res.send({error: msg});
    },
    text: function() {
      res.send(msg + '\n');
    }
  })
}