const serverConfig = require('./server');

const presets = ['@babel/preset-react', ...serverConfig.presets];
const plugins = [
  'babel-plugin-styled-components',
  [
    'direct-import',
    {
      modules: ['react-router', 'react-router-dom'],
    },
  ],
  ...serverConfig.plugins,
];

module.exports = { presets, plugins };
