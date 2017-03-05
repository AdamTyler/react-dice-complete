'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _TestApp = require('./TestApp');

var _TestApp2 = _interopRequireDefault(_TestApp);

var _reactHotLoader = require('react-hot-loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var render = function render(Component) {
  _reactDom2.default.render(_react2.default.createElement(
    _reactHotLoader.AppContainer,
    null,
    _react2.default.createElement(Component, null)
  ), document.getElementById('app'));
};

render(_TestApp2.default);

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