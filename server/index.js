import React from 'react'
import Helmet from 'react-helmet';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import a from '../app/views/app';
import Html from 'components/html/Html';

//
// <div id="root">${renderToString(React.createElement(App))}</div>
// <script src="/client.js"></script>

module.exports = (stats) => (req, res, next) => {
  const js = getJsFromStats(stats);
  const css = getCssFromStats(stats);
  const head = getHeadFromStats(stats)
  const markup = renderToString(React.createElement(a));
  console.log(require('util').inspect(js, { depth: null }));
  console.log(require('util').inspect(css, { depth: null }));
  const html = renderToStaticMarkup(
    <Html
      js={js && `/${js}`}
      css={css && `/${css}`}
      html={markup}
      head={head}
      // initialState={store.getState()}
    />
  );
  res.status(200).send(html);
  // console.log(require('util').inspect(stats, { depth: 2, colors: true }));
};
const getHeadFromStats = (stats) => {
  return Helmet.rewind();
}
const getJsFromStats = (stats) => {
  let assets = stats.assetsByChunkName.main;
  console.log(require('util').inspect(stats.assetsByChunkName, { depth: null, colors: true }));
  if (!Array.isArray(assets)) {
    assets = [assets];
  }
  console.log(require('util').inspect(assets, { depth: null, colors: true }));
  const foundAssets = assets.filter(asset => /\.js$/.test(asset));
  console.log(require('util').inspect(foundAssets, { depth: null, colors: true }));
  console.log(require('util').inspect('9999999999', { depth: null, colors: true }));
  return foundAssets;
}

const getCssFromStats = (stats) => {
    let assets = stats.assetsByChunkName.main;
    if (!Array.isArray(assets)) {
        assets = [assets];
    }
    return assets.filter(asset => /\.css$/.test(asset));
}
