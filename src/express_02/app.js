const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const multipart = require('connect-multiparty')

const user = require('./middleware/user');

const messages = require('./lib/messages');
const routes = require('./routes');
const register = require('./routes/register');
const login = require('./routes/login');


const { errorHandler } = require('./utils/error-handler');

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || '3000';
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
app.use(messages);
app.use(user);

if ('development' == env) {
  app.use(errorHandler);
};

app.get('/', routes.index);
app.get('/register', register.form);
app.post('/register', register.submit);
app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);
app.get('/content', routes.content);

app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});