const fs = require('fs');
const path = require('path');

module.exports = app => {
  const files = fs.readdirSync(path.join(__dirname));
  for (let index in files) {
    let file = files[index];
    if (file === 'index.js') continue;
    if (path.extname(file) != '.js') continue;

    const router = require(`./${path.basename(file)}`);
    if (typeof router === 'function') {
      router(app);
    }
  }
};
