import React from 'react';
import { Axis } from './type';

const ROOT_STYLE: React.CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
};

const CENTER_STYLE: React.CSSProperties = {
  position: 'absolute',
  pointerEvents: 'none',
  left: '50%',
  top: 0,
  transform: 'translateX(-50%)',
};

const CENTER_COLUMN_STYLE: React.CSSProperties = {
  position: 'absolute',
  pointerEvents: 'none',
  top: '50%',
  left: 0,
  transform: 'translateY(-50%)',
};

const CANVAS_STYLE: React.CSSProperties = {
  display: 'block',
  transitionDuration: '300ms',
};

const createCanvasStyle = (
  axis: Axis,
  translate: number
): React.CSSProperties => {
  if (translate === 0) return CANVAS_STYLE;
  switch (axis) {
    case 'y':
    case 'y-reverse':
      return { ...CANVAS_STYLE, transform: `translateY(${translate}px)` };
    default:
      return { ...CANVAS_STYLE, transform: `translateX(${translate}px)` };
  }
};

const createRootStyle = (style?: React.CSSProperties): React.CSSProperties =>
  style ? { ...ROOT_STYLE, ...style } : ROOT_STYLE;

const createCenterStyle = (axis: Axis): React.CSSProperties => {
  switch (axis) {
    case 'y':
    case 'y-reverse':
      return CENTER_COLUMN_STYLE;
    default:
      return CENTER_STYLE;
  }
};

export default {
  createCanvasStyle,
  createRootStyle,
  createCenterStyle,
};
