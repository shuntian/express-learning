const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const root = __dirname;

const server = http.createServer();
server.on('request', (req, res) => {
  const { pathname } = url.parse(req.url);
  const filePath = path.join(__dirname, pathname);
  const stream = fs.createReadStream(filePath);
  // 版本1
  // stream.on('data', (chunk) => {
  //   res.write(chunk);
  // });
  // stream.on('end', () => {
  //   res.end("\n");
  // });
  // 版本2
  stream.pipe(res);
  stream.on('error', (err) => {
    res.statusCode = 500;
    res.end('Internal server error\n');
  });
});

server.listen(8088, () => {
  console.log('Server is start, please visit http://127.0.0.1:8088 to load data');
});
