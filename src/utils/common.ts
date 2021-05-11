import { Axis, TouchPoint } from '../data/type';

// Log10 polyfill. IE does not support log10().
Math.log10 = Math.log10 ?? ((x: number): number => Math.log(x) * Math.LOG10E);

const isOverBoundary = (options: {
  min: number;
  max: number;
  delta: number;
  value: number;
}): boolean => {
  const { min, max, delta, value } = options;
  return (value <= min && delta > 0) || (value >= max && delta < 0);
};

const calcReboundTranslate = (delta: number): number =>
  Math.sign(delta) * 1.5988 * Math.abs(delta) ** 0.7962;

const calcInertialShfitInPx = (touchPoints: Array<TouchPoint>): number => {
  if (touchPoints.length < 4) return 0;
  const [first, , , last] = touchPoints.slice(-4);
  const v = ((last.shift - first.shift) / (last.time - first.time)) * 1000;
  return (Math.sign(v) * v ** 2) / 6000;
};

const adjustValue = (options: {
  min: number;
  max: number;
  precision: number;
  value: number;
}): number => {
  const { min, max, precision, value } = options;
  const clampedValue = Math.max(min, Math.min(value, max));
  return Math.round(clampedValue / precision) * precision;
};

const calcNumberOfDecimalPlace = (precision: number): number =>
  -Math.floor(Math.log10(precision));

const getBasis = (axis: Axis, width: number, height: number): number => {
  switch (axis) {
    case 'y':
    case 'y-reverse':
      return height;
    default:
      return width;
  }
};

const calcFromTo = (options: {
  min: number;
  max: number;
  precision: number;
  gap: number;
  basis: number;
  value: number;
}): object => {
  const { min, max, precision, gap, basis, value } = options;
  const halfBasis = basis / 2;
  const diffCurrentMin = ((value - min) * gap) / precision;
  const _startValue = value - Math.floor(halfBasis / gap) * precision;
  const startValue = Math.max(min, Math.min(_startValue, max));
  const _endValue = startValue + (basis / gap) * precision;
  const endValue = Math.min(_endValue, max);
  const originPoint =
    diffCurrentMin > halfBasis
      ? halfBasis - ((value - startValue) * gap) / precision
      : halfBasis - diffCurrentMin;

  const from = Math.round(startValue / precision);
  const to = Math.round(endValue / precision);
  const calcGradationCoordinate = (i: number): number =>
    originPoint + (i - from) * gap;

  return { from, to, calcGradationCoordinate };
};

export default {
  isOverBoundary,
  calcReboundTranslate,
  calcInertialShfitInPx,
  adjustValue,
  calcNumberOfDecimalPlace,
  getBasis,
  calcFromTo,
};
