import React from 'react';
import Canvas from './Canvas';
import styles from './styles';
import { SlideRuleProps } from './type';

const DEFAULT_PROPS = {
  row: {
    width: 300,
    height: 55,
    cursor: <div style={{ width: 3, height: 35, background: 'blue' }} />,
    primaryStyle: { color: '#C4C4C4', width: 3, height: 30, top: 0 },
    secondaryStyle: { color: '#E4E4E4', width: 2, height: 15, top: 0 },
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
    primaryStyle: { color: '#C4C4C4', width: 30, height: 3, left: 0 },
    secondaryStyle: { color: '#E4E4E4', width: 15, height: 2, left: 0 },
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
    primaryStyle = {},
    secondaryStyle = {},
    textStyle = {},
    style,
    ...rest
  } = props;

  if (!offWarning) validate({ value, min, max, precision });

  const def = DEFAULT_PROPS[direction];
  const { width = def.width, height = def.height, cursor = def.cursor } = rest;
  const enhancedPrimaryStyle = { ...def.primaryStyle, ...primaryStyle };
  const enhancedSecondaryStyle = { ...def.secondaryStyle, ...secondaryStyle };
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
        primaryStyle={enhancedPrimaryStyle}
        secondaryStyle={enhancedSecondaryStyle}
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
