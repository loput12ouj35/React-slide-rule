"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Canvas = _interopRequireDefault(require("./Canvas"));

var _styles = _interopRequireDefault(require("./data/styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var DEFAULT_PROPS = {
  row: {
    width: 300,
    height: 55,
    cursor: /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        width: 3,
        height: 35,
        background: 'blue'
      }
    }),
    primaryStyle: {
      color: '#C4C4C4',
      width: 3,
      height: 30,
      top: 0
    },
    secondaryStyle: {
      color: '#E4E4E4',
      width: 2,
      height: 15,
      top: 0
    },
    textStyle: {
      size: '1.25em',
      family: 'Arial',
      color: 'rgba(0, 0, 0, 0.87)',
      top: 35,
      textAlign: 'center',
      textBaseline: 'top'
    }
  },
  column: {
    width: 75,
    height: 300,
    cursor: /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        width: 35,
        height: 3,
        backgroundColor: 'red'
      }
    }),
    primaryStyle: {
      color: '#C4C4C4',
      width: 30,
      height: 3,
      left: 0
    },
    secondaryStyle: {
      color: '#E4E4E4',
      width: 15,
      height: 2,
      left: 0
    },
    textStyle: {
      size: '1.25em',
      family: 'Arial',
      color: 'rgba(0, 0, 0, 0.87)',
      left: 35,
      textAlign: 'left',
      textBaseline: 'middle'
    }
  }
};

var _default = /*#__PURE__*/_react["default"].forwardRef(function SlideRule(props, ref) {
  var _props$onChange = props.onChange,
      onChange = _props$onChange === void 0 ? function (v) {
    return v;
  } : _props$onChange,
      _props$gap = props.gap,
      gap = _props$gap === void 0 ? 10 : _props$gap,
      _props$precision = props.precision,
      precision = _props$precision === void 0 ? 1 : _props$precision,
      _props$max = props.max,
      max = _props$max === void 0 ? 300 : _props$max,
      _props$min = props.min,
      min = _props$min === void 0 ? 0 : _props$min,
      _props$value = props.value,
      value = _props$value === void 0 ? 150 : _props$value,
      _props$offWarning = props.offWarning,
      offWarning = _props$offWarning === void 0 ? false : _props$offWarning,
      _props$direction = props.direction,
      direction = _props$direction === void 0 ? 'row' : _props$direction,
      _props$primaryStyle = props.primaryStyle,
      primaryStyle = _props$primaryStyle === void 0 ? {} : _props$primaryStyle,
      _props$secondaryStyle = props.secondaryStyle,
      secondaryStyle = _props$secondaryStyle === void 0 ? {} : _props$secondaryStyle,
      _props$textStyle = props.textStyle,
      textStyle = _props$textStyle === void 0 ? {} : _props$textStyle,
      style = props.style,
      rest = _objectWithoutProperties(props, ["onChange", "gap", "precision", "max", "min", "value", "offWarning", "direction", "primaryStyle", "secondaryStyle", "textStyle", "style"]);

  if (!offWarning) validate({
    value: value,
    min: min,
    max: max,
    precision: precision
  });
  var def = DEFAULT_PROPS[direction];
  var _rest$width = rest.width,
      width = _rest$width === void 0 ? def.width : _rest$width,
      _rest$height = rest.height,
      height = _rest$height === void 0 ? def.height : _rest$height,
      _rest$cursor = rest.cursor,
      cursor = _rest$cursor === void 0 ? def.cursor : _rest$cursor;

  var enhancedPrimaryStyle = _objectSpread(_objectSpread({}, def.primaryStyle), primaryStyle);

  var enhancedSecondaryStyle = _objectSpread(_objectSpread({}, def.secondaryStyle), secondaryStyle);

  var enhancedTextStyle = _objectSpread(_objectSpread({}, def.textStyle), textStyle);

  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: ref,
    style: _styles["default"].createRootStyle(style)
  }, /*#__PURE__*/_react["default"].createElement(_Canvas["default"], {
    onChange: onChange,
    gap: gap,
    precision: precision,
    max: max,
    min: min,
    value: Number(value),
    direction: direction,
    primaryStyle: enhancedPrimaryStyle,
    secondaryStyle: enhancedSecondaryStyle,
    textStyle: enhancedTextStyle,
    width: width,
    height: height
  }), /*#__PURE__*/_react["default"].createElement("div", {
    style: _styles["default"].createCenterStyle(direction)
  }, cursor));
});

exports["default"] = _default;

function validate(options) {
  var value = options.value,
      min = options.min,
      max = options.max,
      precision = options.precision;
  if (typeof value !== 'number') console.warn('value prop should be number!');
  if (!Number.isInteger(min / precision)) console.warn('min prop should be a multiple of precision prop');
  if (!Number.isInteger(max / precision)) console.warn('max prop should be a multiple of precision prop');
  if (!Number.isInteger(value / precision)) console.warn('value prop should be a multiple of precision prop');
}