import { TouchPoint } from '../data/type';

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
  step: number;
  value: number;
}): number => {
  const { min, max, step, value } = options;
  const clampedValue = Math.max(min, Math.min(value, max));
  return Math.round(clampedValue / step) * step;
};

const countDecimalPlace = (step: number): number =>
  -Math.floor(Math.log10(step));

const calcFromTo = (options: {
  step: number;
  gap: number;
  basis: number;
  value: number;
  isReverseAxis: boolean;
}): object => {
  const { step, gap, basis, value, isReverseAxis } = options;
  const halfBasis = basis / 2;
  const startValue = value - Math.floor(halfBasis / gap) * step;
  const from = Math.round(startValue / step); // use round() in case of decimal place
  const to = from + basis / gap;
  const marginLeft = halfBasis % gap;
  const calcMarkCoordinate = isReverseAxis
    ? (i: number): number => marginLeft + (to - i) * gap
    : (i: number): number => marginLeft + (i - from) * gap;

  return { from, to, calcMarkCoordinate };
};

export default {
  isOverBoundary,
  calcReboundTranslate,
  calcInertialShfitInPx,
  adjustValue,
  countDecimalPlace,
  calcFromTo,
};
