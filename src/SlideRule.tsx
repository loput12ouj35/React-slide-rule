import React from 'react';
import Canvas from './Canvas';
import styles from './data/styles';
import { Axis, MarkStyle, NumberStyle, SlideRuleProps } from './data/type';

const DEFAULT_X_AXIS_PROPS: SlideRuleProps = {
  width: 300,
  height: 55,
  cursor: <div style={{ width: 4, height: 35, backgroundColor: '#2AA' }} />,
  markStyle: { color: '#C4C4C4', width: 3, height: 30, top: 0 },
  smallerMarkStyle: { color: '#E4E4E4', width: 2, height: 15, top: 0 },
  numberStyle: {
    size: '1.25em',
    family: 'Arial',
    color: 'rgba(0, 0, 0, 0.87)',
    top: 36,
    textAlign: 'center',
    textBaseline: 'top',
    rotate: 0,
  },
};

const DEFAULT_Y_AXIS_PROPS: SlideRuleProps = {
  width: 75,
  height: 300,
  cursor: <div style={{ width: 35, height: 4, backgroundColor: '#2AA' }} />,
  markStyle: { color: '#C4C4C4', width: 30, height: 3, left: 0 },
  smallerMarkStyle: { color: '#E4E4E4', width: 15, height: 2, left: 0 },
  numberStyle: {
    size: '1.25em',
    family: 'Arial',
    color: 'rgba(0, 0, 0, 0.87)',
    left: 36,
    textAlign: 'left',
    textBaseline: 'middle',
    rotate: 0,
  },
};

const _isXAxis = (axis: Axis): boolean => axis === 'x' || axis === 'x-reverse';
const _getOrMerge = (
  source: MarkStyle | NumberStyle = {},
  target?: MarkStyle | NumberStyle
): MarkStyle | NumberStyle => {
  try {
    return target ? { ...source, ...target } : source;
  } catch (e) {
    return source;
  }
};

export default React.forwardRef(function SlideRule(
  props: SlideRuleProps,
  ref: React.Ref<any>
) {
  const {
    onChange = (v: number) => v,
    gap = 10,
    step = 1,
    max = 300,
    min = 0,
    value = 150,
    axis = 'x',
    markStyle,
    smallerMarkStyle,
    numberStyle,
    unit = '',
    style,
    showWarning = false,
    ...rest
  } = props;

  if (showWarning) validate({ value, min, max, step });

  const def = _isXAxis(axis) ? DEFAULT_X_AXIS_PROPS : DEFAULT_Y_AXIS_PROPS;
  const { width = def.width, height = def.height, cursor = def.cursor } = rest;

  return (
    <div ref={ref} style={styles.createRootStyle(style)}>
      <Canvas
        onChange={onChange}
        gap={gap}
        step={step}
        max={max}
        min={min}
        value={Number(value)}
        axis={axis}
        markStyle={_getOrMerge(def.markStyle, markStyle)}
        smallerMarkStyle={_getOrMerge(def.smallerMarkStyle, smallerMarkStyle)}
        numberStyle={_getOrMerge(def.numberStyle, numberStyle)}
        width={width}
        height={height}
        unit={unit}
      />
      <div style={styles.createCenterStyle(_isXAxis(axis))}>{cursor}</div>
    </div>
  );
});

function validate(options: {
  value: number;
  min: number;
  max: number;
  step: number;
}) {
  const { value, min, max, step } = options;
  if (typeof value !== 'number') console.warn('value prop should be number!');
  if (!Number.isInteger(min / step))
    console.warn('min prop should be a multiple of the step prop');
  if (!Number.isInteger(max / step))
    console.warn('max prop should be a multiple of the step prop');
  if (!Number.isInteger(value / step))
    console.warn('value prop should be a multiple of the step prop');
}
