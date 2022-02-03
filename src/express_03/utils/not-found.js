exports.notfound = (req, res) => {
  res.status(404).format({
    html: function() {
      res.render('404');
    },
    json: function() {
      res.send({message: 'Resource not found'});
    },
    xml: function() {
      res.write('<error>\n');
      res.write('<message>Resource not found</message>\n');
      res.end('</error>\n');
    },
    text: function() {
      res.send('REsource not found');
    }
  })
}