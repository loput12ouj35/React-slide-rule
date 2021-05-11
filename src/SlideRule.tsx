import React from 'react';
import Canvas from './Canvas';
import styles from './data/styles';
import { SlideRuleProps } from './data/type';

const DEFAULT_PROPS = {
  row: {
    width: 300,
    height: 55,
    cursor: <div style={{ width: 3, height: 35, background: 'blue' }} />,
    majorStyle: { color: '#C4C4C4', width: 3, height: 30, top: 0 },
    minorStyle: { color: '#E4E4E4', width: 2, height: 15, top: 0 },
    textStyle: {
      size: '1.25em',
      family: 'Arial',
      color: 'rgba(0, 0, 0, 0.87)',
      top: 35,
      textAlign: 'center',
      textBaseline: 'top',
    },
  },
  column: {
    width: 75,
    height: 300,
    cursor: <div style={{ width: 35, height: 3, backgroundColor: 'red' }} />,
    majorStyle: { color: '#C4C4C4', width: 30, height: 3, left: 0 },
    minorStyle: { color: '#E4E4E4', width: 15, height: 2, left: 0 },
    textStyle: {
      size: '1.25em',
      family: 'Arial',
      color: 'rgba(0, 0, 0, 0.87)',
      left: 35,
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
    offWarning = false,
    direction = 'row',
    majorStyle = {},
    minorStyle = {},
    textStyle = {},
    style,
    ...rest
  } = props;

  if (!offWarning) validate({ value, min, max, precision });

  const def = DEFAULT_PROPS[direction];
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
        direction={direction}
        majorStyle={enhancedMajorStyle}
        minorStyle={enhancedMinorStyle}
        textStyle={enhancedTextStyle}
        width={width}
        height={height}
      />
      <div style={styles.createCenterStyle(direction)}>{cursor}</div>
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
