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

const CENTER_VERTICAL_STYLE: React.CSSProperties = {
  position: 'absolute',
  pointerEvents: 'none',
  top: '50%',
  left: 0,
  transform: 'translateY(-50%)',
};

const CANVAS_STYLE: React.CSSProperties = {
  display: 'block',
  margin: '0 auto',
  transitionDuration: '300ms',
  transform: 'translateX(0px)',
};

const createCanvasStyle = (translateX: number): React.CSSProperties =>
  translateX === 0
    ? CANVAS_STYLE
    : { ...CANVAS_STYLE, transform: `translateX(${translateX}px)` };

const createRootStyle = (style: React.CSSProperties): React.CSSProperties =>
  style ? { ...ROOT_STYLE, ...style } : ROOT_STYLE;

const createCenterStyle = (vertical: boolean): React.CSSProperties =>
  vertical ? CENTER_VERTICAL_STYLE : CENTER_STYLE;

export default {
  createCanvasStyle,
  createRootStyle,
  createCenterStyle,
};
