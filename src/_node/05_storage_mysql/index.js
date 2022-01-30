const http = require('http');
const workController = require('./controllers/work-controller');
const mysql = require('mysql');

var db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'db_dev',
  database: 'time_track'
});

const server = http.createServer((req, res) => {
  switch(req.method) {
    case 'POST': {
      switch(req.url) {
        case '/': {
          workController.add(db, req, res);
          break;
        }
        case '/archive': {
          workController.archive(db, req, res);
          break;
        }
        case '/delete': {
          workController.delete(db, req, res);
          break;
        }
      }
      break;
    }
    case 'GET': {
      switch(req.url) {
        case '/': {
          workController.show(db, res);
          break;
        }
        case '/archived': {
          workController.showArchive(db, res);
          break;
        }
      }
      break;
    }
    default: 
      console.log('aaa');
  }
});

const sql = new String() +
  'CREATE TABLE IF NOT EXISTS work (' +
  ' id INT(10) NOT NULL AUTO_INCREMENT,' +
  ' hours DECIMAL(5, 2) DEFAULT 0,' +
  ' date DATE,' +
  ' archived INT(1) DEFAULT 0,' +
  ' description LONGTEXT,' +
  ' PRIMARY KEY(id)' +
  ');';

db.query(sql, (err) => {
  if (err) throw err;
  server.listen(8088, () => {
    console.log('Server started..., please visit http://127.0.0.1:8088 to load page');
  })
});