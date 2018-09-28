const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtendedDefinePlugin = require('extended-define-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const analyzer = require('webpack-bundle-analyzer');

const clientConfig = require('./babelConfig/client');

const { BundleAnalyzerPlugin } = analyzer;
const devMode = process.env.NODE_ENV !== 'production';

const config = {
  entry: ['@babel/polyfill', './client/src/index.jsx'],
  output: {
    path: path.resolve(__dirname, '..', 'public'),
    publicPath: '../',
    filename: '[name].js',
  },
  mode: console.log(process.env.NODE_ENV) || devMode ? 'development' : 'production',
  devtool: 'source-map',
  node: {
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: clientConfig,
          },
          {
            loader: 'stylelint-custom-processor-loader',
            options: { emitWarning: true },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
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
  plugins: [
    new MiniCssExtractPlugin(),
    new ExtendedDefinePlugin({
      __FONT_AWESOME__: devMode ? 'local' : 'sha384-9ralMzdK1QYsk4yBY680hmsb4/hJ98xK3w0TIaJ3ll4POWpWUYaA2bRjGGujGT8w',
    }),
    new ErrorOverlayPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, '..', 'client', 'src', 'components'),
      utils: path.resolve(__dirname, '..', 'client', 'src', 'utils'),
      store: path.resolve(__dirname, '..', 'client', 'src', 'store'),
      hocs: path.resolve(__dirname, '..', 'client', 'src', 'hocs'),
      data: path.resolve(__dirname, '..', 'client', 'src', 'data'),
    },
  },
};

module.exports = config;
