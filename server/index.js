import '@babel/polyfill';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import passport from 'passport';
import keys from './config/keys';
import fileUpload from 'express-fileupload';
import initializeRoutes from './routes';
import initializeModels from './models';
import initializePassport from './services/passport';

initializeModels();
initializePassport();

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

initializeRoutes(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '..', 'public')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  });
}

app.listen(keys.PORT, () => {
  console.info(`App listening on port ${keys.PORT}`);
});
