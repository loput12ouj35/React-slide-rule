"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _drawingUtil = _interopRequireDefault(require("./utils/drawingUtil"));

var _styles = _interopRequireDefault(require("./data/styles"));

var _common = _interopRequireDefault(require("./utils/common"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Canvas = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Canvas, _React$PureComponent);

  var _super = _createSuper(Canvas);

  function Canvas() {
    var _this;

    _classCallCheck(this, Canvas);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "coordinate", 0);

    _defineProperty(_assertThisInitialized(_this), "isTouching", false);

    _defineProperty(_assertThisInitialized(_this), "touchPoints", []);

    _defineProperty(_assertThisInitialized(_this), "state", {
      translate: 0
    });

    _defineProperty(_assertThisInitialized(_this), "browserEnv", Boolean(window.ontouchstart));

    _defineProperty(_assertThisInitialized(_this), "canvasRef", /*#__PURE__*/_react["default"].createRef());

    _defineProperty(_assertThisInitialized(_this), "currentValue", _this.props.value);

    _defineProperty(_assertThisInitialized(_this), "getCoordinate", function (e) {
      var _e$touches$, _e$touches;

      var _ref = (_e$touches$ = (_e$touches = e.touches) === null || _e$touches === void 0 ? void 0 : _e$touches[0]) !== null && _e$touches$ !== void 0 ? _e$touches$ : e,
          pageX = _ref.pageX,
          pageY = _ref.pageY;

      var direction = _this.props.direction;

      switch (direction) {
        case 'column':
          return pageY;

        default:
          return pageX;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleTouchStart", function (e) {
      if (_this.isTouching) return;
      _this.isTouching = true;

      var coordinate = _this.getCoordinate(e);

      _this.addTouchPoint(coordinate);

      _this.coordinate = coordinate;
    });

    _defineProperty(_assertThisInitialized(_this), "handleTouchMove", function (e) {
      if (!_this.isTouching) return;

      var coordinate = _this.getCoordinate(e);

      _this.addTouchPoint(coordinate);

      var delta = coordinate - _this.coordinate;
      var gap = _this.props.gap;
      if (Math.abs(delta) < gap) return;
      if (_this.rebound(delta)) return;
      _this.coordinate = coordinate;

      _this.moveGradations(delta);
    });

    _defineProperty(_assertThisInitialized(_this), "handleTouchEnd", function () {
      if (!_this.isTouching) return;
      _this.isTouching = false;
      if (_this.browserEnv) _this.moveGradations(_common["default"].calcInertialShfitInPx(_this.touchPoints));

      _this.setState({
        translate: 0
      });

      _this.touchPoints = [];
    });

    _defineProperty(_assertThisInitialized(_this), "addTouchPoint", function (shift) {
      return _this.touchPoints.push({
        time: new Date().getTime(),
        shift: shift
      });
    });

    return _this;
  }

  _createClass(Canvas, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.drawCanvas();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.drawCanvas();
    }
  }, {
    key: "rebound",
    value: function rebound(delta) {
      var _this$props = this.props,
          max = _this$props.max,
          min = _this$props.min;
      if (!_common["default"].isOverBoundary({
        max: max,
        min: min,
        delta: delta,
        value: this.currentValue
      })) return false;

      var translate = _common["default"].calcReboundTranslate(delta);

      this.setState({
        translate: translate
      });
      return true;
    }
  }, {
    key: "moveGradations",
    value: function moveGradations(delta) {
      var _this2 = this;

      var _this$props2 = this.props,
          gap = _this$props2.gap,
          precision = _this$props2.precision,
          onChange = _this$props2.onChange;
      var diff = Math.round(-delta / gap);
      var moveValue = Math.abs(diff);

      var draw = function draw() {
        var _find;

        if (moveValue < 1) {
          if (precision >= 1) return onChange(_this2.currentValue);

          var decimalPlace = _common["default"].calcNumberOfDecimalPlace(precision);

          return onChange(Number(_this2.currentValue.toFixed(decimalPlace)));
        }

        _this2.currentValue += Math.sign(diff) * precision;
        moveValue -= (_find = [64, 16, 4].find(function (n) {
          return moveValue > n;
        })) !== null && _find !== void 0 ? _find : 1;

        _this2.drawCanvas();

        return window.requestAnimationFrame(draw);
      };

      window.requestAnimationFrame(draw);
    }
  }, {
    key: "drawCanvas",
    value: function drawCanvas() {
      var _this$props3 = this.props,
          min = _this$props3.min,
          max = _this$props3.max,
          precision = _this$props3.precision,
          gap = _this$props3.gap;
      this.currentValue = _common["default"].adjustValue({
        max: max,
        min: min,
        precision: precision,
        value: this.currentValue
      });
      var canvas = this.canvasRef.current;
      var _this$props4 = this.props,
          direction = _this$props4.direction,
          width = _this$props4.width,
          height = _this$props4.height;

      var basis = _common["default"].getBasis(direction, width, height);

      if (!canvas) return;

      var _util$calcFromTo = _common["default"].calcFromTo({
        max: max,
        min: min,
        precision: precision,
        gap: gap,
        basis: basis,
        value: this.currentValue
      }),
          from = _util$calcFromTo.from,
          to = _util$calcFromTo.to,
          calcGradationCoordinate = _util$calcFromTo.calcGradationCoordinate;

      var _this$props5 = this.props,
          primaryStyle = _this$props5.primaryStyle,
          secondaryStyle = _this$props5.secondaryStyle,
          textStyle = _this$props5.textStyle;

      _drawingUtil["default"].drawCanvas({
        canvas: canvas,
        precision: precision,
        primaryStyle: primaryStyle,
        secondaryStyle: secondaryStyle,
        textStyle: textStyle,
        from: from,
        to: to,
        calcGradationCoordinate: calcGradationCoordinate,
        direction: direction
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          width = _this$props6.width,
          height = _this$props6.height,
          _this$props6$value = _this$props6.value,
          value = _this$props6$value === void 0 ? null : _this$props6$value,
          direction = _this$props6.direction;
      var translate = this.state.translate;
      if (value !== null) this.currentValue = value;
      return /*#__PURE__*/_react["default"].createElement("canvas", {
        ref: this.canvasRef,
        width: width,
        height: height,
        style: _styles["default"].createCanvasStyle(direction, translate),
        onTouchStart: this.handleTouchStart,
        onMouseDown: this.handleTouchStart,
        onTouchMove: this.handleTouchMove,
        onMouseMove: this.handleTouchMove,
        onTouchEnd: this.handleTouchEnd,
        onMouseUp: this.handleTouchEnd,
        onMouseLeave: this.handleTouchEnd
      });
    }
  }]);

  return Canvas;
}(_react["default"].PureComponent);

exports["default"] = Canvas;