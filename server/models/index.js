import mongoose from 'mongoose';
import keys from '../config/keys';
import moduleLoader from './../utils/moduleLoader';

mongoose.connect(
  keys.mongoURI,
  {
    user: keys.mongoLogin,
    pass: keys.mongoPassword,
    useNewUrlParser: true,
  },
);

export default () => moduleLoader(__dirname, 'index.js');
