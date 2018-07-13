const fs = require('fs');
const keys = require('./../config/keys');
const mongoose = require('mongoose');
const path = require('path');

module.exports = () => {
  mongoose.connect(keys.mongoURI, {
    user: keys.mongoLogin,
    pass: keys.mongoPassword,
    useNewUrlParser: true,
  });
  const files = fs.readdirSync(path.join(__dirname));
  for(let index in files) {
    let file = files[index];
    if (file === 'index.js') continue;
    if (path.extname(file) !== '.js') continue;

    const model = require(`./${path.basename(file)}`);
    if (typeof model === 'function') {
      model();
    }
  }
};
