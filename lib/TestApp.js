'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactDice = require('./ReactDice');

var _ReactDice2 = _interopRequireDefault(_ReactDice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TestApp = function (_Component) {
  _inherits(TestApp, _Component);

  function TestApp(props) {
    _classCallCheck(this, TestApp);

    var _this = _possibleConstructorReturn(this, (TestApp.__proto__ || Object.getPrototypeOf(TestApp)).call(this, props));

    _this.state = {
      outline: false,
      outlineColor: '#000000',
      dieSize: 60,
      disableIndividual: false,
      margin: 15,
      numDice: 4,
      sides: 6,
      rollTime: 2,
      faceColor: '#FF00AC',
      dotColor: '#1eff00',
      diceTotal: 0,
      rolling: false
    };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.rollDone = _this.rollDone.bind(_this);
    _this.rollAll = _this.rollAll.bind(_this);
    return _this;
  }

  _createClass(TestApp, [{
    key: 'handleChange',
    value: function handleChange(e) {
      var value = e.target.value;
      if (e.target.type === 'number') {
        value = parseInt(e.target.value, 10);
        if (value < e.target.min) {
          value = e.target.min;
        } else if (value > e.target.max) {
          value = e.target.max;
        }
      }
      if (e.target.type === 'checkbox') {
        value = !this.state[e.target.name];
      }
      this.setState(_defineProperty({}, e.target.name, value));
    }
  }, {
    key: 'rollDone',
    value: function rollDone(value) {
      this.setState({ diceTotal: value, rolling: false });
    }
  }, {
    key: 'rollAll',
    value: function rollAll() {
      this.reactDice.rollAll();
      this.setState({ rolling: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var state = this.state;

      var colorStyle = { height: '2.375rem' };
      return _react2.default.createElement(
        'div',
        { className: 'dice-test' },
        _react2.default.createElement(
          'form',
          { className: 'row controls align-items-end' },
          _react2.default.createElement(
            'fieldset',
            { className: 'form-group col' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'numDice' },
              'Dice'
            ),
            _react2.default.createElement('input', { type: 'number', name: 'numDice', id: 'numDice', className: 'form-control',
              value: state.numDice, onChange: this.handleChange, min: '1', max: '100' })
          ),
          _react2.default.createElement(
            'fieldset',
            { className: 'form-group col' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'faceColor' },
              'Face Color'
            ),
            _react2.default.createElement('input', { type: 'color', name: 'faceColor', id: 'faceColor', className: 'form-control', style: colorStyle,
              value: state.faceColor, onChange: this.handleChange })
          ),
          _react2.default.createElement(
            'fieldset',
            { className: 'form-group col' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'dotColor' },
              'Dot Color'
            ),
            _react2.default.createElement('input', { type: 'color', name: 'dotColor', id: 'dotColor', className: 'form-control', style: colorStyle,
              value: state.dotColor, onChange: this.handleChange })
          ),
          _react2.default.createElement(
            'fieldset',
            { className: 'form-group col' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'dieSize' },
              'Die Size (px)'
            ),
            _react2.default.createElement('input', { type: 'number', name: 'dieSize', id: 'dieSize', className: 'form-control',
              value: state.dieSize, onChange: this.handleChange, min: '30', max: '200' })
          ),
          _react2.default.createElement(
            'fieldset',
            { className: 'form-group col' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'rollTime' },
              'Roll Time (seconds)'
            ),
            _react2.default.createElement('input', { type: 'number', name: 'rollTime', id: 'rollTime', className: 'form-control',
              value: state.rollTime, onChange: this.handleChange, min: '1', max: '4' })
          ),
          _react2.default.createElement(
            'fieldset',
            { className: 'form-group col' },
            _react2.default.createElement(
              'div',
              { className: 'form-check' },
              _react2.default.createElement(
                'label',
                { className: 'form-check-label' },
                _react2.default.createElement('input', { type: 'checkbox', className: 'form-check-input', name: 'outline', id: 'outline',
                  checked: state.outline, onChange: this.handleChange }),
                '  ',
                'Outline'
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement('input', { type: 'color', name: 'outlineColor', id: 'outlineColor', className: 'form-control', style: colorStyle,
                value: state.outlineColor, onChange: this.handleChange,
                disabled: !this.state.outline })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row info' },
          _react2.default.createElement(
            'div',
            { className: 'col' },
            _react2.default.createElement(
              'h4',
              null,
              _react2.default.createElement(
                'button',
                { className: 'btn btn-primary', onClick: this.rollAll },
                'Roll All'
              ),
              '   ',
              ' or click individual dice'
            )
          ),
          _react2.default.createElement(
            'fieldset',
            { className: 'form-group col' },
            _react2.default.createElement(
              'div',
              { className: 'form-check' },
              _react2.default.createElement(
                'label',
                { className: 'form-check-label' },
                _react2.default.createElement('input', { type: 'checkbox', className: 'form-check-input', name: 'disableIndividual', id: 'disableIndividual',
                  checked: state.disableIndividual, onChange: this.handleChange }),
                ' ',
                ' Disable individual roll on click'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col' },
            _react2.default.createElement(
              'h4',
              { className: 'text-primary' },
              'Dice Total:',
              _react2.default.createElement(
                'span',
                { style: { display: this.state.rolling ? 'none' : 'inline-block' } },
                this.state.diceTotal
              ),
              _react2.default.createElement(
                'div',
                { className: 'sk-cube-grid', style: { display: this.state.rolling ? 'inline-block' : 'none' } },
                _react2.default.createElement('div', { className: 'sk-cube sk-cube1' }),
                _react2.default.createElement('div', { className: 'sk-cube sk-cube2' }),
                _react2.default.createElement('div', { className: 'sk-cube sk-cube3' }),
                _react2.default.createElement('div', { className: 'sk-cube sk-cube4' }),
                _react2.default.createElement('div', { className: 'sk-cube sk-cube5' }),
                _react2.default.createElement('div', { className: 'sk-cube sk-cube6' }),
                _react2.default.createElement('div', { className: 'sk-cube sk-cube7' }),
                _react2.default.createElement('div', { className: 'sk-cube sk-cube8' }),
                _react2.default.createElement('div', { className: 'sk-cube sk-cube9' })
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row dice' },
          _react2.default.createElement(
            'div',
            { className: 'col' },
            _react2.default.createElement(_ReactDice2.default, _extends({}, this.state, { rollDone: this.rollDone,
              ref: function ref(c) {
                return _this2.reactDice = c;
              } }))
          )
        )
      );
    }
  }]);

  return TestApp;
}(_react.Component);

var _default = TestApp;
exports.default = _default;
module.exports = exports['default'];
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TestApp, 'TestApp', 'src/TestApp.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/TestApp.js');
}();

;
//# sourceMappingURL=TestApp.js.map