'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Die = function (_Component) {
  _inherits(Die, _Component);

  function Die(props) {
    _classCallCheck(this, Die);

    var _this = _possibleConstructorReturn(this, (Die.__proto__ || Object.getPrototypeOf(Die)).call(this, props));

    _this.state = {
      currentValue: 6
    };
    _this.rollDie = _this.rollDie.bind(_this);
    return _this;
  }

  _createClass(Die, [{
    key: 'getRandomInt',
    value: function getRandomInt() {
      var min = 1;
      var max = Math.ceil(this.props.sides);
      return Math.floor(Math.random() * max) + min;
    }
  }, {
    key: 'rollDie',
    value: function rollDie() {
      var _this2 = this;

      this.die.classList = 'die';
      void this.die.offsetWidth;
      var roll = this.getRandomInt();
      this.die.classList.add('roll' + roll);
      setTimeout(function () {
        _this2.setState({ currentValue: roll });
        _this2.props.rollDone(roll);
      }, this.props.rollTime * 1000);
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.state.currentValue;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      // face styles
      var faceStyle = {
        background: this.props.faceColor,
        outline: this.props.outline ? '1px solid ' + this.props.outlineColor : 'none',
        height: this.props.dieSize + 'px',
        position: 'absolute',
        width: this.props.dieSize + 'px'
      };
      var f1Style = { transform: 'rotateX(180deg) translateZ(' + this.props.dieSize / 2 + 'px)' };
      var f2Style = { transform: 'rotateY(-90deg) translateZ(' + this.props.dieSize / 2 + 'px)' };
      var f3Style = { transform: 'rotateX(90deg) translateZ(' + this.props.dieSize / 2 + 'px)' };
      var f4Style = { transform: 'rotateX(-90deg) translateZ(' + this.props.dieSize / 2 + 'px)' };
      var f5Style = { transform: 'rotateY(90deg) translateZ(' + this.props.dieSize / 2 + 'px)' };
      var f6Style = { transform: 'rotateY(0deg) translateZ(' + this.props.dieSize / 2 + 'px)' };
      // dot styles
      var dotSize = this.props.dieSize / 6 - 2;
      var dotStyle = {
        background: this.props.dotColor,
        height: dotSize + 'px',
        width: dotSize + 'px'
      };
      var d1Style = { top: this.props.dieSize / 6 + 'px', left: this.props.dieSize / 6 + 'px' };
      var d2Style = { top: this.props.dieSize / 6 + 'px', right: this.props.dieSize / 6 + 'px' };
      var d3Style = { top: this.props.dieSize / 2 - dotSize / 2 + 'px', left: this.props.dieSize / 6 + 'px' };
      var d4Style = { top: this.props.dieSize / 2 - dotSize / 2 + 'px', left: this.props.dieSize / 2 - dotSize / 2 + 'px' };
      var d5Style = { top: this.props.dieSize / 2 - dotSize / 2 + 'px', right: this.props.dieSize / 6 + 'px' };
      var d6Style = { bottom: this.props.dieSize / 6 + 'px', left: this.props.dieSize / 6 + 'px' };
      var d7Style = { bottom: this.props.dieSize / 6 + 'px', right: this.props.dieSize / 6 + 'px' };
      // roll styles
      var rollStyle = {
        animationDuration: this.props.rollTime + 's',
        height: this.props.dieSize + 'px',
        width: this.props.dieSize + 'px'
      };
      // container styles
      var containerStyle = {
        margin: this.props.margin + 'px',
        display: 'inline-block'
      };
      return _react2.default.createElement(
        'div',
        { className: 'die-container', onClick: this.props.disableIndividual ? null : this.rollDie, style: containerStyle },
        _react2.default.createElement(
          'div',
          { className: 'die', ref: function ref(die) {
              return _this3.die = die;
            }, style: rollStyle },
          _react2.default.createElement(
            'div',
            { className: 'face six', style: Object.assign({}, faceStyle, f6Style) },
            _react2.default.createElement('span', { className: 'dot', style: Object.assign({}, dotStyle, d1Style) }),
            _react2.default.createElement('span', { className: 'dot', style: Object.assign({}, dotStyle, d2Style) }),
            _react2.default.createElement('span', { className: 'dot', style: Object.assign({}, dotStyle, d3Style) }),
            _react2.default.createElement('span', { className: 'dot', style: Object.assign({}, dotStyle, d5Style) }),
            _react2.default.createElement('span', { className: 'dot', style: Object.assign({}, dotStyle, d6Style) }),
            _react2.default.createElement('span', { className: 'dot', style: Object.assign({}, dotStyle, d7Style) })
          ),
          _react2.default.createElement(
            'div',
            { className: 'face one', style: Object.assign({}, faceStyle, f1Style) },
            _react2.default.createElement('span', { className: 'dot', style: Object.assign({}, dotStyle, d4Style) })
          ),
          _react2.default.createElement(
            'div',
            { className: 'face five', style: Object.assign({}, faceStyle, f5Style) },
            _react2.default.createElement('span', { className: 'dot', style: Object.assign({}, dotStyle, d1Style) }),
            _react2.default.createElement('span', { className: 'dot', style: Object.assign({}, dotStyle, d2Style) }),
            _react2.default.createElement('span', { className: 'dot', style: Object.assign({}, dotStyle, d4Style) }),
            _react2.default.createElement('span', { className: 'dot', style: Object.assign({}, dotStyle, d6Style) }),
            _react2.default.createElement('span', { className: 'dot', style: Object.assign({}, dotStyle, d7Style) })
          ),
          _react2.default.createElement(
            'div',
            { className: 'face two', style: Object.assign({}, faceStyle, f2Style) },
            _react2.default.createElement('span', { className: 'dot', style: Object.assign({}, dotStyle, d2Style) }),
            _react2.default.createElement('span', { className: 'dot', style: Object.assign({}, dotStyle, d6Style) })
          ),
          _react2.default.createElement(
            'div',
            { className: 'face three', style: Object.assign({}, faceStyle, f3Style) },
            _react2.default.createElement('span', { className: 'dot', style: Object.assign({}, dotStyle, d2Style) }),
            _react2.default.createElement('span', { className: 'dot', style: Object.assign({}, dotStyle, d4Style) }),
            _react2.default.createElement('span', { className: 'dot', style: Object.assign({}, dotStyle, d6Style) })
          ),
          _react2.default.createElement(
            'div',
            { className: 'face four', style: Object.assign({}, faceStyle, f4Style) },
            _react2.default.createElement('span', { className: 'dot', style: Object.assign({}, dotStyle, d1Style) }),
            _react2.default.createElement('span', { className: 'dot', style: Object.assign({}, dotStyle, d2Style) }),
            _react2.default.createElement('span', { className: 'dot', style: Object.assign({}, dotStyle, d6Style) }),
            _react2.default.createElement('span', { className: 'dot', style: Object.assign({}, dotStyle, d7Style) })
          )
        )
      );
    }
  }]);

  return Die;
}(_react.Component);

var _default = Die;
exports.default = _default;
module.exports = exports['default'];
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Die, 'Die', 'src/Die.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/Die.js');
}();

;
//# sourceMappingURL=Die.js.map