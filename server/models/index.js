const fs = require('fs');
const path = require('path');

module.exports = () => {
  const files = fs.readdirSync("models");
  for(let index in files) {
    let file = files[index];
    if (file === "index.js") continue;
    if (path.extname(file) != ".js") continue;

    const model = require(`./${path.basename(file)}`);
    if (typeof model === "function") {
      model();
    }
  }
};
