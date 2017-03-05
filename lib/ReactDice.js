var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, PropTypes } from 'react';
import DiceContainer from './DiceContainer';

var ReactDice = function (_Component) {
  _inherits(ReactDice, _Component);

  function ReactDice(props) {
    _classCallCheck(this, ReactDice);

    var _this = _possibleConstructorReturn(this, (ReactDice.__proto__ || Object.getPrototypeOf(ReactDice)).call(this, props));

    _this.totalCb = _this.totalCb.bind(_this);
    _this.rollAll = _this.rollAll.bind(_this);
    return _this;
  }

  _createClass(ReactDice, [{
    key: 'totalCb',
    value: function totalCb(value) {
      this.props.rollDone(value);
    }
  }, {
    key: 'rollAll',
    value: function rollAll() {
      this.diceContainer.rollAll();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        null,
        React.createElement(DiceContainer, _extends({}, this.props, { totalCb: this.totalCb,
          ref: function ref(c) {
            return _this2.diceContainer = c;
          } }))
      );
    }
  }]);

  return ReactDice;
}(Component);

ReactDice.propTypes = {
  outline: PropTypes.bool,
  outlineColor: PropTypes.string,
  dieSize: PropTypes.number,
  disableIndividual: PropTypes.bool,
  margin: PropTypes.number,
  numDice: PropTypes.number,
  sides: PropTypes.number,
  rollTime: PropTypes.number,
  rollDone: PropTypes.function,
  faceColor: PropTypes.string,
  dotColor: PropTypes.string
};
ReactDice.defaultProps = {
  outline: false,
  outlineColor: '#000000',
  dieSize: 60,
  disableIndividual: false,
  margin: 15,
  numDice: 4,
  sides: 6,
  rollTime: 2,
  faceColor: '#FF00AC',
  dotColor: '#1dff00'
};
var _default = ReactDice;


export default _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(ReactDice, 'ReactDice', 'src/ReactDice.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/ReactDice.js');
}();

;
//# sourceMappingURL=ReactDice.js.map