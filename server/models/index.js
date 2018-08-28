import mongoose from 'mongoose';
import keys from '../config/keys';

import category from './category';
import city from './city';
import initiative from './initiative';
import university from './university';
import user from './user';

const models = [category, city, initiative, university, user];

export default () => {
  mongoose.connect(
    keys.mongoURI,
    {
      user: keys.mongoLogin,
      pass: keys.mongoPassword,
      useNewUrlParser: true,
    },
  );

  models.map(({ name, schema }) => {
    mongoose.model(name, schema);
  });
};
