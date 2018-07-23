const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const fileUpload = require('express-fileupload');

require('./models')();
require('./services/passport');

const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
// app.use(fileUpload());
app.use(
  cookieSession({
    maxAge: keys.sessionDuration,
    keys: [keys.cookieKey],
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
  res.render('index', {});
});

require('./routes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '..', 'public')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  });
}

app.listen(keys.PORT, () => {
  console.info(`App listening on port ${keys.PORT}`);
});
