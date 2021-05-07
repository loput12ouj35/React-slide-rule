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
  direction: string,
  translate: number
): React.CSSProperties => {
  if (translate === 0) return CANVAS_STYLE;
  switch (direction) {
    case 'column':
    case 'column-reverse':
      return { ...CANVAS_STYLE, transform: `translateY(${translate}px)` };
    default:
      return { ...CANVAS_STYLE, transform: `translateX(${translate}px)` };
  }
};

const createRootStyle = (style?: React.CSSProperties): React.CSSProperties =>
  style ? { ...ROOT_STYLE, ...style } : ROOT_STYLE;

// todo: change type of direction
const createCenterStyle = (direction: string): React.CSSProperties => {
  switch (direction) {
    case 'column':
    case 'column-reverse':
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
