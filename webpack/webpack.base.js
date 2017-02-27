/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// TODO: Add image optimization
// TODO: Add image DLL

const extractVendorCSSPlugin = new ExtractTextPlugin('vendor.[contenthash].css');
const isBuildingDll = Boolean(process.env.BUILDING_DLL);

const vendorCSSLoaders = extractVendorCSSPlugin.extract({
  fallback: 'style-loader',
  use: 'css-loader',
});

module.exports = (options) => ({
  name: options.name,
  target: options.target,
  entry: options.entry,
  output: Object.assign({
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
    filename: '[name].js',
  }, options.output), // Merge with env dependent settings
  module: {
    loaders: [{
      test: /\.js$/, // Transform all .js files required somewhere with Babel
      use: ['react-hot-loader','babel-loader'],
      exclude: /.*node_modules((?!localModule).)*$/,
      query: options.babelQuery,
    }, {
      // Transform 3rd party css into an external stylesheet (vendor.[contenthash].css)
      test: /\.css$/,
      include: /node_modules/,
      use: vendorCSSLoaders,
    }, {
      test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
      use: 'file-loader',
    }, {
      test: /\.(jpg|png|gif)$/,
      use: [
        'file-loader',
      ],
    }, {
      test: /\.html$/,
      use: 'html-loader',
    }, {
      test: /\.json$/,
      use: 'json-loader',
    }, {
      test: /\.(mp4|webm)$/,
      use: 'url-loader?limit=10000',
    }],
  },
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.NamedModulesPlugin(),
    extractVendorCSSPlugin,
  ]).concat(
    []
    // isBuildingDll ? [] : [assetsPluginInstance]
  ),
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
  devtool: options.devtool,
  performance: options.performance || {},
});
