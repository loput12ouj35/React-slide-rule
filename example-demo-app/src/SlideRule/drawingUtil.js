"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _util = _interopRequireDefault(require("./util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _drawVerticalLine = function _drawVerticalLine(ctx, coordinate, style) {
  var width = style.width,
      height = style.height,
      color = style.color,
      top = style.top;
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.moveTo(coordinate, top);
  ctx.lineTo(coordinate, height);
  ctx.stroke();
};

var _drawLine = function _drawLine(ctx, coordinate, style) {
  var width = style.width,
      height = style.height,
      color = style.color,
      left = style.left;
  ctx.lineWidth = height;
  ctx.strokeStyle = color;
  ctx.moveTo(left, coordinate);
  ctx.lineTo(width, coordinate);
  ctx.stroke();
};

var _drawTextFromTop = function _drawTextFromTop(_ref) {
  var ctx = _ref.ctx,
      text = _ref.text,
      coordinate = _ref.coordinate,
      top = _ref.textStyle.top;
  return ctx.fillText(text, coordinate, top);
};

var _drawTextFromLeft = function _drawTextFromLeft(_ref2) {
  var ctx = _ref2.ctx,
      text = _ref2.text,
      coordinate = _ref2.coordinate,
      left = _ref2.textStyle.left;
  return ctx.fillText(text, left, coordinate);
};

var _getDrawFns = function _getDrawFns(direction) {
  switch (direction) {
    case 'column':
    case 'column-reverse':
      return [_drawLine, _drawTextFromLeft];

    default:
      return [_drawVerticalLine, _drawTextFromTop];
  }
};

var _applyNumberTextStyle = function _applyNumberTextStyle(ctx, textStyle) {
  var size = textStyle.size,
      family = textStyle.family,
      color = textStyle.color,
      textAlign = textStyle.textAlign,
      textBaseline = textStyle.textBaseline;
  ctx.fillStyle = color;
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.font = "".concat(size, " ").concat(family);
};

var _calcNumberText = function _calcNumberText(i, precision) {
  var number = i * precision;
  if (precision >= 0.1) return number;

  var decimalPlace = _util["default"].calcNumberOfDecimalPlace(precision);

  return number.toFixed(decimalPlace - 1);
};

var drawCanvas = function drawCanvas(_ref3) {
  var canvas = _ref3.canvas,
      precision = _ref3.precision,
      primaryStyle = _ref3.primaryStyle,
      secondaryStyle = _ref3.secondaryStyle,
      textStyle = _ref3.textStyle,
      from = _ref3.from,
      to = _ref3.to,
      calcGradationCoordinate = _ref3.calcGradationCoordinate,
      direction = _ref3.direction;
  var ctx = canvas.getContext('2d');

  var _getDrawFns2 = _getDrawFns(direction),
      _getDrawFns3 = _slicedToArray(_getDrawFns2, 2),
      drawLine = _getDrawFns3[0],
      drawText = _getDrawFns3[1];

  _applyNumberTextStyle(ctx, textStyle);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = from; i <= to; i++) {
    var coordinate = calcGradationCoordinate(i);
    ctx.beginPath();

    if (i % 10 === 0) {
      drawLine(ctx, coordinate, primaryStyle);

      var text = _calcNumberText(i, precision);

      drawText({
        ctx: ctx,
        text: text,
        coordinate: coordinate,
        textStyle: textStyle
      });
    } else drawLine(ctx, coordinate, secondaryStyle);

    ctx.closePath();
  }
};

var _default = {
  drawCanvas: drawCanvas
};
exports["default"] = _default;