import React from 'react';
import Canvas from './Canvas';
import styles from './data/styles';
import { SlideRuleProps } from './data/type';

interface DefaultProps {
  [axis: string]: SlideRuleProps;
}

const DEFAULT_PROPS: DefaultProps = {
  x: {
    width: 300,
    height: 55,
    cursor: <div style={{ width: 4, height: 35, background: '#2AA' }} />,
    majorStyle: { color: '#C4C4C4', width: 3, height: 30, top: 0 },
    minorStyle: { color: '#E4E4E4', width: 2, height: 15, top: 0 },
    textStyle: {
      size: '1.25em',
      family: 'Arial',
      color: 'rgba(0, 0, 0, 0.87)',
      top: 36,
      textAlign: 'center',
      textBaseline: 'top',
    },
  },
  y: {
    width: 75,
    height: 300,
    cursor: <div style={{ width: 35, height: 4, backgroundColor: '#2AA' }} />,
    majorStyle: { color: '#C4C4C4', width: 30, height: 3, left: 0 },
    minorStyle: { color: '#E4E4E4', width: 15, height: 2, left: 0 },
    textStyle: {
      size: '1.25em',
      family: 'Arial',
      color: 'rgba(0, 0, 0, 0.87)',
      left: 36,
      textAlign: 'left',
      textBaseline: 'middle',
    },
  },
};

export default React.forwardRef(function SlideRule(
  props: SlideRuleProps,
  ref: React.Ref<any>
) {
  const {
    onChange = (v: number) => v,
    gap = 10,
    precision = 1,
    max = 300,
    min = 0,
    value = 150,
    axis = 'x',
    majorStyle = {},
    minorStyle = {},
    textStyle = {},
    unit = '',
    style,
    showWarning = false,
    ...rest
  } = props;

  if (!showWarning) validate({ value, min, max, precision });

  const def = DEFAULT_PROPS[axis];
  const { width = def.width, height = def.height, cursor = def.cursor } = rest;
  const enhancedMajorStyle = { ...def.majorStyle, ...majorStyle };
  const enhancedMinorStyle = { ...def.minorStyle, ...minorStyle };
  const enhancedTextStyle = { ...def.textStyle, ...textStyle };

  return (
    <div ref={ref} style={styles.createRootStyle(style)}>
      <Canvas
        onChange={onChange}
        gap={gap}
        precision={precision}
        max={max}
        min={min}
        value={Number(value)}
        axis={axis}
        majorStyle={enhancedMajorStyle}
        minorStyle={enhancedMinorStyle}
        textStyle={enhancedTextStyle}
        width={width}
        height={height}
        unit={unit}
      />
      <div style={styles.createCenterStyle(axis)}>{cursor}</div>
    </div>
  );
});

function validate(options: {
  value: number;
  min: number;
  max: number;
  precision: number;
}) {
  const { value, min, max, precision } = options;
  if (typeof value !== 'number') console.warn('value prop should be number!');
  if (!Number.isInteger(min / precision))
    console.warn('min prop should be a multiple of precision prop');
  if (!Number.isInteger(max / precision))
    console.warn('max prop should be a multiple of precision prop');
  if (!Number.isInteger(value / precision))
    console.warn('value prop should be a multiple of precision prop');
}
