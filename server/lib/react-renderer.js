"use strict";

var fs = require('fs');

var path = require('path');

var React = require('react');

var _require = require('react-dom/server'),
    renderToString = _require.renderToString;

var _require2 = require('./paths'),
    BUILD_DIR = _require2.BUILD_DIR;

var App = require('../../client/lib/components/App')["default"];

var _require3 = require('react-redux'),
    Provider = _require3.Provider;

var configureStore = require("../../client/lib/state/store")["default"];

function reactRenderer(req, res) {
  var store = configureStore();
  var app = renderToString(React.createElement(Provider, {
    store: store
  }, React.createElement(App, null)));
  var html = fs.readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf8').replace('__ROOT__', app).replace('__REDUX__', JSON.stringify(store.getState()));
  return res.send(html);
}

module.exports = reactRenderer;