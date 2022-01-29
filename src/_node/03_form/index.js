const http = require('http');
const path = require('path');
const { show, add } = require('./controller');

const server = http.createServer();
server.on('request', (req, res) => {
  switch(req.method) {
    case 'POST': {
      add(req, res);
      break;
    }
    case 'GET': {
      show(req, res);
      break;
    }
    default:
      badRequest(res)
  }
});

server.listen(8088, () => {
  console.log('server is started, please visit http://127.0.0.1:8080/ to load page');
});
