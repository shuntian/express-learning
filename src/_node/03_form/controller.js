const qs = require('querystring');
let items = [];

const show = (req, res) => {
  const content = items.map((item, i) => {
    return `<li><span>${i}</span>${' '} <span>${item}</span></li>`
  }).join('');
  const html = '<html><head><title>aaa</title></head><body>'
              + '<ul>'
              + content
              + '</ul>'
              + '<form method="post" action="/">'
              + '<p>todo: <input type="text" name="item" /></p>'
              + '<p><input type="submit" value="Add item" /></p>'
              + '</form>'
              + '</body></html>';

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(html);
}

const add = (req, res) => {
  let content = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    content += chunk;
  })
  req.on('end', () => {
    const item = qs.parse(content);
    items.push(item.item);
    show(req, res);
  });
}

module.exports = {
  show,
  add,
}