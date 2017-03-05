var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import Die from './Die';

import './styles.scss';

var DiceContainer = function (_Component) {
  _inherits(DiceContainer, _Component);

  function DiceContainer(props) {
    _classCallCheck(this, DiceContainer);

    var _this = _possibleConstructorReturn(this, (DiceContainer.__proto__ || Object.getPrototypeOf(DiceContainer)).call(this, props));

    _this.state = {
      totalValue: props.numDice * 6
    };
    _this.dice = [];
    _this.rollCount = 0;

    _this.rollDone = _this.rollDone.bind(_this);
    _this.rollAll = _this.rollAll.bind(_this);
    _this.getDiceTotal = _this.getDiceTotal.bind(_this);

    return _this;
  }

  _createClass(DiceContainer, [{
    key: 'rollAll',
    value: function rollAll() {
      this.rollCount = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.dice[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var die = _step.value;

          if (die !== null) {
            this.rollCount++;
            die.rollDie();
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'rollDone',
    value: function rollDone() {
      this.rollCount--;
      if (this.rollCount <= 0) {
        this.getDiceTotal();
      }
    }
  }, {
    key: 'getDiceTotal',
    value: function getDiceTotal() {
      var total = 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.dice[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var die = _step2.value;

          if (die !== null) {
            total += die.getValue();
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this.setState({ totalValue: total });
      this.props.totalCb(total);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.totalCb(this.state.totalValue);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.numDice !== this.props.numDice) {
        this.getDiceTotal();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = this.props;

      var dice = [];
      this.dice.splice(props.numDice, 100 - props.numDice);

      var _loop = function _loop(i) {
        dice.push(React.createElement(Die, _extends({}, props, { key: i, rollDone: _this2.rollDone, ref: function ref(die) {
            return _this2.dice[i] = die;
          } })));
      };

      for (var i = 0; i < props.numDice; i++) {
        _loop(i);
      }

      return React.createElement(
        'div',
        { className: 'dice' },
        dice
      );
    }
  }]);

  return DiceContainer;
}(Component);

var _default = DiceContainer;
export default _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(DiceContainer, 'DiceContainer', 'src/DiceContainer.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/DiceContainer.js');
}();

;
//# sourceMappingURL=DiceContainer.js.map