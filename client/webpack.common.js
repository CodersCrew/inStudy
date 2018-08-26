const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/index.jsx'],
  output: {
    path: path.resolve(__dirname, '..', 'public'),
    publicPath: '/',
    filename: '[name].js',
  },
  node: {
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader', 'stylelint-custom-processor-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        loaders: ['file-loader', 'image-webpack-loader'],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
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
    new CleanWebpackPlugin([path.resolve(__dirname, '..', 'public')]),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),

    new ExtractTextPlugin('styles.css'),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, 'src', 'components'),
      utils: path.resolve(__dirname, 'src', 'utils'),
      store: path.resolve(__dirname, 'src', 'store'),
      hocs: path.resolve(__dirname, 'src', 'hocs'),
      data: path.resolve(__dirname, 'src', 'data'),
    },
  },
};
