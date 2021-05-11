import util from './common';

const _drawVerticalLine = (ctx, coordinate, style) => {
  const { width, height, color, top } = style;

  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.moveTo(coordinate, top);
  ctx.lineTo(coordinate, height);
  ctx.stroke();
};

const _drawLine = (ctx, coordinate, style) => {
  const { width, height, color, left } = style;

  ctx.lineWidth = height;
  ctx.strokeStyle = color;
  ctx.moveTo(left, coordinate);
  ctx.lineTo(width, coordinate);
  ctx.stroke();
};

const _drawTextFromTop = ({ ctx, text, coordinate, textStyle: { top } }) =>
  ctx.fillText(text, coordinate, top);

const _drawTextFromLeft = ({ ctx, text, coordinate, textStyle: { left } }) =>
  ctx.fillText(text, left, coordinate);

const _getDrawFns = (direction) => {
  switch (direction) {
    case 'column':
    case 'column-reverse':
      return [_drawLine, _drawTextFromLeft];
    default:
      return [_drawVerticalLine, _drawTextFromTop];
  }
};

const _applyNumberTextStyle = (ctx, textStyle) => {
  const { size, family, color, textAlign, textBaseline } = textStyle;
  ctx.fillStyle = color;
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.font = `${size} ${family}`;
};

const _calcNumberText = (i, precision) => {
  const number = i * precision;
  if (precision >= 0.1) return number;
  const decimalPlace = util.calcNumberOfDecimalPlace(precision);

  return number.toFixed(decimalPlace - 1);
};

const drawCanvas = ({
  canvas,
  precision,
  majorStyle,
  minorStyle,
  textStyle,
  from,
  to,
  calcGradationCoordinate,
  direction,
}) => {
  const ctx = canvas.getContext('2d');
  const [drawLine, drawText] = _getDrawFns(direction);

  _applyNumberTextStyle(ctx, textStyle);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = from; i <= to; i++) {
    const coordinate = calcGradationCoordinate(i);

    ctx.beginPath();
    if (i % 10 === 0) {
      drawLine(ctx, coordinate, majorStyle);
      const text = _calcNumberText(i, precision);
      drawText({ ctx, text, coordinate, textStyle });
    } else drawLine(ctx, coordinate, minorStyle);

    ctx.closePath();
  }
};

export default { drawCanvas };
