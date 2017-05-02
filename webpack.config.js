const Webpack = require('webpack');

const config = {
  entry: __dirname + '/src/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  // ------------------------- server ---------------------------------
  devServer: {
    contentBase: __dirname + '/src',
  },
};

module.exports = config;
