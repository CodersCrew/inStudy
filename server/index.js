import '@babel/polyfill';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import passport from 'passport';
import keys from './config/keys';

import initializeRoutes from './routes';
import initializeModels from './models';
import initializePassport from './services/passport';
import mongoose from 'mongoose';

const app = express();
initializeModels();
initializePassport();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
const Initiative = mongoose.model('initiatives');


app.use(
  cookieSession({
    maxAge: keys.sessionDuration,
    keys: [keys.cookieKey],
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

initializeRoutes(app);

app.get('/', (req, res) => {
  res.render(path.resolve(__dirname, '..', 'server', 'views', 'index'), {});
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '..', 'public')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  });
  app.get('/inicjatywy/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
    const fetchedInitiative = await Initiative.findOne({ shortUrl });

    const { name, description, opengraph, shortUrl } = fetchedInitiative;
    const initiativeView = path.resolve(__dirname, '..', 'server', 'views', 'index');
    res.render(initiativeView, {
      name: name || '',
      description: description || '',
      opengraph: opengraph || '',
      url: shortUrl || '',
    });
  })
}

app.listen(keys.PORT, () => console.info(`App listening on port ${keys.PORT}`));
