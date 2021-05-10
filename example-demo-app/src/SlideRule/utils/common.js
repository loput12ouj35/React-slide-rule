"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Math$log;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Log10 polyfill. IE does not support log10().
Math.log10 = (_Math$log = Math.log10) !== null && _Math$log !== void 0 ? _Math$log : function (x) {
  return Math.log(x) * Math.LOG10E;
};

var isOverBoundary = function isOverBoundary(options) {
  var min = options.min,
      max = options.max,
      delta = options.delta,
      value = options.value;
  return value <= min && delta > 0 || value >= max && delta < 0;
};

var calcReboundTranslate = function calcReboundTranslate(delta) {
  return Math.sign(delta) * 1.5988 * Math.pow(Math.abs(delta), 0.7962);
};

var calcInertialShfitInPx = function calcInertialShfitInPx(touchPoints) {
  if (touchPoints.length < 4) return 0;

  var _touchPoints$slice = touchPoints.slice(-4),
      _touchPoints$slice2 = _slicedToArray(_touchPoints$slice, 4),
      first = _touchPoints$slice2[0],
      last = _touchPoints$slice2[3];

  var v = (last.shift - first.shift) / (last.time - first.time) * 1000;
  return Math.sign(v) * Math.pow(v, 2) / 12000;
};

var adjustValue = function adjustValue(options) {
  var min = options.min,
      max = options.max,
      precision = options.precision,
      value = options.value;
  var clampedValue = Math.max(min, Math.min(value, max));
  return Math.round(clampedValue / precision) * precision;
};

var calcNumberOfDecimalPlace = function calcNumberOfDecimalPlace(precision) {
  return -Math.floor(Math.log10(precision));
};

var getBasis = function getBasis(direction, width, height) {
  switch (direction) {
    case 'column':
    case 'column-reverse':
      return height;

    default:
      return width;
  }
};

var calcFromTo = function calcFromTo(options) {
  var min = options.min,
      max = options.max,
      precision = options.precision,
      gap = options.gap,
      basis = options.basis,
      value = options.value;
  var halfBasis = basis / 2;
  var diffCurrentMin = (value - min) * gap / precision;

  var _startValue = value - Math.floor(halfBasis / gap) * precision;

  var startValue = Math.max(min, Math.min(_startValue, max));

  var _endValue = startValue + basis / gap * precision;

  var endValue = Math.min(_endValue, max);
  var originPoint = diffCurrentMin > halfBasis ? halfBasis - (value - startValue) * gap / precision : halfBasis - diffCurrentMin;
  var from = Math.round(startValue / precision);
  var to = endValue / precision;

  var calcGradationCoordinate = function calcGradationCoordinate(i) {
    return originPoint + (i - startValue / precision) * gap;
  };

  return {
    from: from,
    to: to,
    calcGradationCoordinate: calcGradationCoordinate
  };
};

var _default = {
  isOverBoundary: isOverBoundary,
  calcReboundTranslate: calcReboundTranslate,
  calcInertialShfitInPx: calcInertialShfitInPx,
  adjustValue: adjustValue,
  calcNumberOfDecimalPlace: calcNumberOfDecimalPlace,
  getBasis: getBasis,
  calcFromTo: calcFromTo
};
exports["default"] = _default;