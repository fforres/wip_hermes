/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */
require('babel-register');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
];

const configDevClient =  require('./webpack.base')({
  // Add hot reloading in development
  name: 'client',
  target: 'web',
  entry: [
    'webpack-hot-middleware/client',
    path.join(process.cwd(), './app/views/app.js'), // Start with js/app.js
  ],

  // Don't use hashes in dev mode for better performance
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  // Add development plugins
  plugins: [].concat(plugins), // eslint-disable-line no-use-before-define

  // Tell babel that we want to hot-reload
  // babelQuery: {
  //   // require.resolve solves the issue of relative presets when dealing with
  //   // locally linked packages. This is an issue with babel and webpack.
  //   // See https://github.com/babel/babel-loader/issues/149 and
  //   // https://github.com/webpack/webpack/issues/1866
  //   presets: [
  //     'babel-preset-es2015',
  //     'babel-preset-latest',
  //     'babel-preset-stage-0',
  //     'babel-preset-react',
  //     'babel-preset-react-hmre'
  //   ]
  // },

  // Emit a source map for easier debugging
  // See https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'eval-source-map',

  performance: {
    hints: false,
  },
});


const configDevServer =  require('./webpack.base')({
  // Add hot reloading in development
  name: 'server',
  target: 'node',
  entry: path.join(process.cwd(), './server/index.js'),

  // Don't use hashes in dev mode for better performance
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    libraryTarget: 'commonjs2'
  },

  // Add development plugins
  plugins: [].concat(plugins), // eslint-disable-line no-use-before-define

  // Emit a source map for easier debugging
  // See https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'eval-source-map',

  performance: {
    hints: false,
  },
});


module.exports = [ configDevClient, configDevServer ];
