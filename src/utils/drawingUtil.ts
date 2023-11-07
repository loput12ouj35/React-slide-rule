import { MarkStyle, NumberStyle, SlideRuleProps } from '../data/type';
import util from './common';

type DrawCanvas = Required<
  Omit<
    SlideRuleProps,
    | 'style'
    | 'showWarning'
    | 'cursor'
    | 'axis'
    | 'cursor'
    | 'value'
    | 'gap'
    | 'height'
    | 'onChange'
    | 'width'
  > & {
    canvas: HTMLCanvasElement;
    from: number;
    to: number;
    calcMarkCoordinate: (_v: number) => number;
    isXAxis: boolean;
  }
>;

const DEFAULT_POINTER_X_AXIS_STYLES = {
  top: 0,
  width: 3,
  height: 30,
  color: 'red',
};

const DEFAULT_POINTER_Y_AXIS_STYLES = {
  left: 0,
  width: 30,
  height: 3,
  color: 'red',
};

const _drawVerticalLine = (
  ctx: CanvasRenderingContext2D,
  coordinate: number,
  style: MarkStyle
) => {
  const { width, height, color, top } = style;

  ctx.lineWidth = width!;
  ctx.strokeStyle = color!;
  ctx.moveTo(coordinate, top!);
  ctx.lineTo(coordinate, top! + height!);
  ctx.stroke();
};

const _drawLine = (
  ctx: CanvasRenderingContext2D,
  coordinate: number,
  style: MarkStyle
) => {
  const { width, height, color, left } = style;

  ctx.lineWidth = height!;
  ctx.strokeStyle = color!;
  ctx.moveTo(left!, coordinate);
  ctx.lineTo(left! + width!, coordinate);
  ctx.stroke();
};

const drawNumber = ({
  ctx,
  text,
  coordinate,
  numberStyle: { top, left, rotate },
  isXAxis,
}: {
  ctx: CanvasRenderingContext2D;
  text: string;
  coordinate: number;
  numberStyle: NumberStyle;
  isXAxis: boolean;
}) => {
  ctx.save();
  if (isXAxis) ctx.translate(coordinate, top!);
  else ctx.translate(left!, coordinate);

  ctx.rotate((Math.PI / 180) * rotate);
  ctx.fillText(text, 0, 0);
  ctx.restore();
};

const _applyNumberNumberStyle = (
  ctx: CanvasRenderingContext2D,
  numberStyle: NumberStyle
) => {
  const { size, family, color, textAlign, textBaseline } = numberStyle;
  ctx.fillStyle = color!;
  ctx.textAlign = textAlign!;
  ctx.textBaseline = textBaseline!;
  ctx.font = `${size} ${family}`;
};

const _round = (number: number, step: number) =>
  step >= 0.1 ? number : number.toFixed(util.countDecimalPlace(step) - 1);

const _calcNum = (i: number, step: number) => _round(i * step, step);

const validatePointersValue = (
  pointers: DrawCanvas['pointers'],
  min: number,
  max: number,
  isXAxis: boolean
) => {
  const defaults = isXAxis
    ? DEFAULT_POINTER_X_AXIS_STYLES
    : DEFAULT_POINTER_Y_AXIS_STYLES;

  if (pointers && pointers.length > 0) {
    for (const pointer of pointers) {
      pointer.styles = { ...defaults, ...pointer.styles };
      if (pointer.value > max) {
        pointer.value = max;
      }
      if (pointer.value < min) {
        pointer.value = min;
      }
    }
  }

  return pointers;
};

const drawCanvas = ({
  canvas,
  step,
  markStyle,
  smallerMarkStyle,
  numberStyle,
  unit,
  min,
  max,
  from,
  to,
  calcMarkCoordinate,
  isXAxis,
  pointers,
}: DrawCanvas) => {
  const drawLine = isXAxis ? _drawVerticalLine : _drawLine;

  const lower = Math.round(min / step); // use round() in case of decimal place
  const upper = Math.round(max / step);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  const validatedPointers = validatePointersValue(pointers, min, max, isXAxis);

  _applyNumberNumberStyle(ctx, numberStyle);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = from; i <= to; ++i) {
    if (i < lower || i > upper) continue;
    const coordinate = calcMarkCoordinate(i);

    ctx.beginPath();

    if (i % 10 === 0) {
      drawLine(ctx, coordinate, markStyle);
      const text = _calcNum(i, step) + unit;
      drawNumber({ ctx, text, coordinate, numberStyle, isXAxis });
    } else drawLine(ctx, coordinate, smallerMarkStyle);

    ctx.closePath();
  }

  if (validatedPointers && validatedPointers.length > 0) {
    for (const pointer of validatedPointers) {
      ctx.beginPath();
      const coordinate = calcMarkCoordinate(pointer.value / step);
      drawLine(ctx, coordinate, pointer.styles || {});
      ctx.closePath();
    }
  }
};

export default { drawCanvas };
