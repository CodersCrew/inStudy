const Debug = require('debug');
const util = require('util')

const debug = (input, output, name) => {
  const namedDebug = Debug(name);

  namedDebug(`INPUT: ${util.inspect(input, {showHidden: false, depth: null})}`);
  namedDebug(`OUTPUT: ${util.inspect(output, {showHidden: false, depth: null})}`);
};

const initiativeDebug = (input, output) => debug(input, output, 'initiatives');

module.exports = {
  debug,
  initiativeDebug,
}
