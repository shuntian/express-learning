const http = require('http');
const url = require('url');

let items = [];
const server = http.createServer();
server.on('request', (req, res) => {
  switch(req.method) {
    case 'POST': {
      let item = '';
      req.setEncoding('utf8');
      req.on('data', (chunk) => {
        item += chunk;
      });
      req.on('end', () => {
        items.push(item);
        res.end('OK\n');
      });
      break;
    }
    case 'GET': {
      const body = items.map((item, i) => {
        return i + ') ' + item;
      }).join('\n');
      res.setHeader('Content-Length', Buffer.byteLength(body));
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end(body);
      break;
    }
    case 'DELETE': {
      const path = url.parse(req.url).pathname;
      const i = parseInt(path.slice(1), 10);
      if (isNaN(i)) {
        res.statusCode = 400;
        res.end('Invalid item id');
      } else if (!items[i]) {
        res.statusCode = 404;
        res.end('item not found');
      } else {
        items.splice(i, 1);
        res.end('OK\n');
      }
      break;
    }
    case 'PUT': {
      const path = url.parse(req.url).pathname;
      const i = parseInt(path.slice(1), 10);
      if (isNaN(i)) {
        res.statusCode = 400;
        res.end('Invalid item id');
      } else if (!items[i]) {
        res.statusCode = 404;
        res.end('item not found');
      } else {
        let item = '';
        req.setEncoding('utf8');
        req.on('data', (chunk) => {
          item += chunk;
        });
        req.on('end', () => {
          console.log('aaa');
          console.log(item);
          items.splice(i, 1, item);
          console.log(items);
          res.end('OK\n');
        });
      }
      break;
    }
    default: {
      res.write('Hello world');
      res.end();
    }
  }
});

server.listen(8088, () => {
  console.log(`Server is start, your can visit http://127.0.0.1:8088`);
});