"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ROOT_STYLE = {
  position: 'relative',
  overflow: 'hidden'
};
var CENTER_STYLE = {
  position: 'absolute',
  pointerEvents: 'none',
  left: '50%',
  top: 0,
  transform: 'translateX(-50%)'
};
var CENTER_COLUMN_STYLE = {
  position: 'absolute',
  pointerEvents: 'none',
  top: '50%',
  left: 0,
  transform: 'translateY(-50%)'
};
var CANVAS_STYLE = {
  display: 'block',
  transitionDuration: '300ms'
};

var createCanvasStyle = function createCanvasStyle(direction, translate) {
  if (translate === 0) return CANVAS_STYLE;

  switch (direction) {
    case 'column':
    case 'column-reverse':
      return _objectSpread(_objectSpread({}, CANVAS_STYLE), {}, {
        transform: "translateY(".concat(translate, "px)")
      });

    default:
      return _objectSpread(_objectSpread({}, CANVAS_STYLE), {}, {
        transform: "translateX(".concat(translate, "px)")
      });
  }
};

var createRootStyle = function createRootStyle(style) {
  return style ? _objectSpread(_objectSpread({}, ROOT_STYLE), style) : ROOT_STYLE;
}; // todo: change type of direction


var createCenterStyle = function createCenterStyle(direction) {
  switch (direction) {
    case 'column':
    case 'column-reverse':
      return CENTER_COLUMN_STYLE;

    default:
      return CENTER_STYLE;
  }
};

var _default = {
  createCanvasStyle: createCanvasStyle,
  createRootStyle: createRootStyle,
  createCenterStyle: createCenterStyle
};
exports["default"] = _default;