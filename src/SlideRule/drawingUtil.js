import util from './util';

const _drawLine = (ctx, x, { width, height, color, top }) => {
  ctx.moveTo(x, top);
  ctx.lineWidth = width;
  ctx.lineTo(x, height);
  ctx.strokeStyle = color;
  ctx.stroke();
};

const _drawNumberText = (ctx, text, x, { size, family, color, top }) => {
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.font = `${size} ${family}`;
  ctx.fillText(text, x, top);
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
  primaryStyles,
  secondaryStyles,
  textStyles,
  from,
  to,
  calcX,
}) => {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = from; i <= to; i++) {
    const x = calcX(i);

    ctx.beginPath();
    if (i % 10 === 0) {
      _drawLine(ctx, x, primaryStyles);
      const text = _calcNumberText(i, precision);
      _drawNumberText(ctx, text, x, textStyles);
    } else _drawLine(ctx, x, secondaryStyles);

    ctx.closePath();
  }
};

export default { drawCanvas };
