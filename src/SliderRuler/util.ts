import { TouchPoint } from './type';

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

export default {
  isOverBoundary,
  calcReboundTranslateX,
  calcInertialShfitInPx,
  adjustValue,
  calcNumberOfDecimalPlace,
};
