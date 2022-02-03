const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const routes = require('./routes');

const { errorHandler } = require('./utils/error-handler');
const { notfound } = require('./utils/not-found');
const { error } = require('./utils/error');

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || '3000';
const ERROR_ROUTE = process.env.ERROR_ROUTE || 1;
const app = express();

// ejs view engine
app.set('view engine', 'html');
app.set('views', path.join(__dirname, './views'));
app.engine('.html', require('ejs').__express);

// static server root
app.use(express.static(path.join(__dirname, '/assets')));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multipart);

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

if ('development' == env) {
  app.use(errorHandler);
};
if (ERROR_ROUTE) {
  app.get('/dev/error', (req, res, next) => {
    var err = new Error('database connection failed');
    err.type = 'database';
    next(err);
  })
}

app.get('/', routes.index);

app.use(notfound);
app.use(error);

app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});