import util from './util';

const drawLine = (ctx, x, { width, height, color, top }) => {
  ctx.moveTo(x, top);
  ctx.lineWidth = width;
  ctx.lineTo(x, height);
  ctx.strokeStyle = color;
  ctx.stroke();
};

const drawNumberText = (ctx, text, x, { size, family, color, top }) => {
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.font = `${size} ${family}`;
  ctx.fillText(text, x, top);
};

const calcNumberText = (i, precision) => {
  const number = i * precision;
  if (precision >= 0.1) return number;
  const decimalPlace = util.calcNumberOfDecimalPlace(precision);
  return number.toFixed(decimalPlace - 1);
};

export default {
  drawLine,
  drawNumberText,
  calcNumberText,
};
