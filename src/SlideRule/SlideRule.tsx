import React from 'react';
import Canvas from './Canvas';
import { Property } from 'csstype';
import styles from './styles';

interface IProps {
  onChange: (v: number) => any;
  width: number;
  height: number;
  primaryStyle: {
    color: Property.BackgroundColor;
    width: number;
    height: number;
    top?: number;
    left?: number;
  };
  secondaryStyle: {
    color: Property.BackgroundColor;
    width: number;
    height: number;
    top?: number;
    left?: number;
  };
  textStyle: {
    size: Property.FontSize;
    family: Property.FontFamily;
    color: Property.Color;
    top?: number;
    left?: number;
    textAlign: 'left' | 'right' | 'center' | 'start' | 'end';
    textBaseline:
      | 'top'
      | 'hanging'
      | 'middle'
      | 'alphabetic'
      | 'ideographic'
      | 'bottom';
  };
  gap: number;
  precision: number;
  max: number;
  min: number;
  value: number;
  style?: React.CSSProperties;
  centerComponent: React.ReactElement;
  offWarning: boolean;
  direction: 'row' | 'column';
  // direction: 'row' | 'column' | 'column-reverse' | 'row-reverse';
}

export default class SlideRule extends React.PureComponent<IProps> {
  static defaultProps: IProps = {
    onChange: (v: number) => {},
    primaryStyle: { color: '#C4C4C4', width: 3, height: 30, top: 0, left: 0 },
    secondaryStyle: { color: '#E4E4E4', width: 2, height: 15, top: 0, left: 0 },
    textStyle: {
      size: '1.25em',
      family: 'Arial',
      color: 'rgba(0, 0, 0, 0.87)',
      top: 35,
      left: 35,
      textAlign: 'center',
      textBaseline: 'top',
    },
    width: 300,
    height: 55,
    gap: 10,
    precision: 1,
    max: 300,
    min: 0,
    value: 150,
    centerComponent: (
      <div style={{ width: 3, height: 35, backgroundColor: 'blue' }} />
    ),
    offWarning: false,
    direction: 'row',
  };

  validate() {
    const { value, min, max, precision } = this.props;
    if (typeof value !== 'number') console.warn('value prop should be number!');
    if (!Number.isInteger(min / precision))
      console.warn('min prop should be a multiple of precision prop');
    if (!Number.isInteger(max / precision))
      console.warn('max prop should be a multiple of precision prop');
    if (!Number.isInteger(value / precision))
      console.warn('value prop should be a multiple of precision prop');
  }

  render() {
    const { style, centerComponent, value, offWarning, ...rest } = this.props;
    const { direction } = rest;
    if (!offWarning) this.validate();

    return (
      <div style={styles.createRootStyle(style)}>
        <Canvas {...rest} value={Number(value)} />
        <div style={styles.createCenterStyle(direction)}>{centerComponent}</div>
      </div>
    );
  }
}
