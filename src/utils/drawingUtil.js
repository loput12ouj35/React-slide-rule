import util from './common';

const _drawVerticalLine = (ctx, coordinate, style) => {
  const { width, height, color, top } = style;

  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.moveTo(coordinate, top);
  ctx.lineTo(coordinate, top + height);
  ctx.stroke();
};

const _drawLine = (ctx, coordinate, style) => {
  const { width, height, color, left } = style;

  ctx.lineWidth = height;
  ctx.strokeStyle = color;
  ctx.moveTo(left, coordinate);
  ctx.lineTo(left + width, coordinate);
  ctx.stroke();
};

const _drawTextFromTop = ({ ctx, text, coordinate, textStyle: { top } }) =>
  ctx.fillText(text, coordinate, top);

const _drawTextFromLeft = ({ ctx, text, coordinate, textStyle: { left } }) =>
  ctx.fillText(text, left, coordinate);

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
  const decimalPlace = util.countDecimalPlace(precision);

  return number.toFixed(decimalPlace - 1);
};

const drawCanvas = ({
  canvas,
  precision,
  majorStyle,
  minorStyle,
  textStyle,
  unit,
  from,
  to,
  calcMarkCoordinate,
  isXAxis,
  isReverseAxis,
}) => {
  const drawLine = isXAxis ? _drawVerticalLine : _drawLine;
  const drawText = isXAxis ? _drawTextFromTop : _drawTextFromLeft;
  const ctx = canvas.getContext('2d');

  _applyNumberTextStyle(ctx, textStyle);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = from; i <= to; i++) {
    const coordinate = calcMarkCoordinate(i);

    ctx.beginPath();
    if (i % 10 === 0) {
      drawLine(ctx, coordinate, majorStyle);
      const text = _calcNumberText(i, precision) + unit;
      drawText({ ctx, text, coordinate, textStyle });
    } else drawLine(ctx, coordinate, minorStyle);

    ctx.closePath();
  }
};

export default { drawCanvas };
