import { TouchPoint } from './type';

// Log10 polyfill. IE does not support log10().
Math.log10 = Math.log10 ?? ((x) => Math.log(x) * Math.LOG10E);

const isOverBoundary = (options: {
  min: number;
  max: number;
  deltaX: number;
  value: number;
}) => {
  const { min, max, deltaX, value } = options;
  return (value <= min && deltaX > 0) || (value >= max && deltaX < 0);
};

const calcReboundTranslateX = (deltaX: number): number =>
  Math.sign(deltaX) * 1.5988 * Math.abs(deltaX) ** 0.7962;

const calcInertialShfitInPx = (touchPoints: Array<TouchPoint>): number => {
  if (touchPoints.length < 4) return 0;
  const [first, , , last] = touchPoints.slice(-4);
  const v = ((last.shift - first.shift) / (last.time - first.time)) * 1000;
  return (Math.sign(v) * v ** 2) / 12000;
};

const adjustValue = (options: {
  min: number;
  max: number;
  precision: number;
  value: number;
}) => {
  const { min, max, precision, value } = options;
  const clampedValue = Math.max(min, Math.min(value, max));
  return Math.round(clampedValue / precision) * precision;
};

const calcNumberOfDecimalPlace = (precision: number): number =>
  -Math.floor(Math.log10(precision));

const calcFromTo = (options: {
  min: number;
  max: number;
  precision: number;
  gap: number;
  width: number;
  value: number;
}) => {
  const { min, max, precision, gap, width, value } = options;
  const halfWidth = width / 2;
  const diffCurrentMin = ((value - min) * gap) / precision;
  const _startValue = value - Math.floor(halfWidth / gap) * precision;
  const startValue = Math.max(min, Math.min(_startValue, max));
  const _endValue = startValue + (width / gap) * precision;
  const endValue = Math.min(_endValue, max);
  const originX =
    diffCurrentMin > halfWidth
      ? halfWidth - ((value - startValue) * gap) / precision
      : halfWidth - diffCurrentMin;

  const from = Math.round(startValue / precision);
  const to = endValue / precision;
  const calcX = (i: number) => originX + (i - startValue / precision) * gap;
  return { from, to, calcX };
};

export default {
  isOverBoundary,
  calcReboundTranslateX,
  calcInertialShfitInPx,
  adjustValue,
  calcNumberOfDecimalPlace,
  calcFromTo,
};
