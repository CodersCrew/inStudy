const path = require('path');

const config = {
  output: {
    path: path.resolve(__dirname, '..', '..', 'public'),
    publicPath: path.resolve(__dirname, '..', '..', 'public'),
    filename: '[name].js',
  },
  devtool: 'source-map',
  node: {
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, '..', '..', 'client', 'src', 'components'),
      utils: path.resolve(__dirname, '..', '..', 'client', 'src', 'utils'),
      store: path.resolve(__dirname, '..', '..', 'client', 'src', 'store'),
      hocs: path.resolve(__dirname, '..', '..', 'client', 'src', 'hocs'),
      data: path.resolve(__dirname, '..', '..', 'client', 'src', 'data'),
    },
  },
};

module.exports = config;
