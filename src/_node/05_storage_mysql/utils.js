const qs = require('querystring');

exports.parseReceivedData = (req, cb) => {
  var body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    const data = qs.parse(body);
    cb(data);
  });
}

exports.sendHtml = (res, html) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(html);
};

exports.actionForm = (id, path, label) => {
  const html = new String() +
    `<form method="POST" action="${path}">` +
    ` <input type="hidden" name="id" value="${id}" />` +
    ` <input type="submit" value="${label}" />` +
    ' </form>';
  return html;
}

exports.workArchiveForm = (id) => {
  return exports.actionForm(id, '/archive', 'archive');
}

exports.workDeleteForm = (id) => {
  return exports.actionForm(id, '/delete', 'delete');
}

exports.workHitListHtml = (rows) => {
  let html = '';

  rows.forEach(row => {
    const rowHtml = new String() + 
      '<tr>' +
        `<td>${row.id}</td>` +
        `<td>${row.hours}</td>` +
        `<td>${row.date}</td>` +
        `<td>${row.description}</td>` +
        `<td>${!rows.archived ? exports.workArchiveForm(row.id) : ''}</td>` +
        `<td>${exports.workDeleteForm(row.id)}</td>` +
      '</tr>';
      html += rowHtml;
  })
  return `<table>${html}</table>`;
}

exports.workFormList = () => {
  const html = new String() +
    `<form method="POST" action="/">` +
    ` Date: <input name="date" type="date" /><br />` +
    ` Hours: <input name="hours" type="text" /><br />` +
    ` <p>Description: <br /> <textarea name="description"></textarea><p><br />` +
    ` <input type="submit" value="Add" />` +
    '</form>';
  return html;
}
