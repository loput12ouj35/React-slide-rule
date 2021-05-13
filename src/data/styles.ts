import React from 'react';

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
  translate: number,
  isXAxis: boolean
): React.CSSProperties =>
  translate === 0
    ? CANVAS_STYLE
    : isXAxis
    ? { ...CANVAS_STYLE, transform: `translateX(${translate}px)` }
    : { ...CANVAS_STYLE, transform: `translateY(${translate}px)` };

const createRootStyle = (style?: React.CSSProperties): React.CSSProperties => {
  try {
    return style ? { ...ROOT_STYLE, ...style } : ROOT_STYLE;
  } catch (e) {
    return ROOT_STYLE;
  }
};

const createCenterStyle = (isXAxis: boolean): React.CSSProperties =>
  isXAxis ? CENTER_STYLE : CENTER_COLUMN_STYLE;

export default {
  createCanvasStyle,
  createRootStyle,
  createCenterStyle,
};
