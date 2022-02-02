const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const multipart = require('connect-multiparty');
const routes = require('./routes');
const photos = require('./routes/photos');

const { errorHandler } = require('./utils/error-handler');

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || '3000';
const app = express();

// ejs view engine
app.set('view engine', 'html');
app.set('views', path.join(__dirname, './views'));
app.engine('.html', require('ejs').__express);
app.set('photos', __dirname + '/assets/photos');

// static server root
app.use(express.static(path.join(__dirname, '/assets')));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multipart);

if ('development' == env) {
  app.use(errorHandler);
};

app.get('/', photos.list);
app.get('/upload', photos.form);
app.post('/upload', multipart(), photos.submit(app.get('photos')));
app.get('/photo/:id/download', photos.download(app.get('photos')));

app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});