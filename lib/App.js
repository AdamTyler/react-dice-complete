import React from 'react';
import ReactDOM from 'react-dom';
import TestApp from './TestApp';

import { AppContainer } from 'react-hot-loader';

var render = function render(Component) {
  ReactDOM.render(React.createElement(
    AppContainer,
    null,
    React.createElement(Component, null)
  ), document.getElementById('app'));
};

render(TestApp);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./TestApp', function () {
    var NextApp = require('./TestApp');
    render(NextApp);
  });
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(render, 'render', 'src/App.js');
}();

;
//# sourceMappingURL=App.js.map