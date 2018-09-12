import mongoose from 'mongoose';
import keys from '../config/keys';
import moduleLoader from '../utils/moduleLoader';

mongoose.connect(keys.mongoURI);

export default () => moduleLoader(__dirname, 'index.js');
