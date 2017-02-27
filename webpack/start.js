import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import config from './webpack.dev';
// console.log(require('util').inspect(config, { depth: null, colors: true }));
const compiler = webpack(config);
const app = express();
const isDev = process.env.NODE_ENV !== 'production';

if (process.env.NODE_ENV !== 'production') {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config[0].output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
  app.use(webpackHotServerMiddleware(compiler));
} else {
  // IF WE ARE ON PRODUCTION WE GOTTA DO SOMETHING LIKE THIS:
  // const DIST_DIR = path.join(__dirname, '../dist'); // OUR distribution/build directory
  // const SERVER_RENDERER_PATH = path.join(DIST_DIR, 'server.js'); // Path to server.js (?) Need to condifrm this
  // const CLIENT_STATS_PATH = path.join(DIST_DIR, 'stats.json'); // This needs to be saved on build time
  // const serverRenderer = require(SERVER_RENDERER_PATH);
  // const stats = require(CLIENT_STATS_PATH);
  // app.use(express.static(DIST_DIR));
  // app.use(serverRenderer(stats));
}

app.listen(3000, console.log('listening on 3000'))
