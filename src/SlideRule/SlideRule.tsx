import React from 'react';
import Canvas from './Canvas';
import { Property } from 'csstype';

interface IProps {
  onChange: (v: number) => any;
  width: Property.Width;
  height: Property.Height;
  primaryStyles: {
    color: Property.BackgroundColor;
    width: number;
    height: number;
    top: number;
  };
  secondaryStyles: {
    color: Property.BackgroundColor;
    width: number;
    height: number;
    top: number;
  };
  textStyles: {
    size: Property.FontSize;
    family: Property.FontFamily;
    color: Property.Color;
    top: number;
  };
  gap: number;
  precision: number;
  max: number;
  min: number;
  value: number;
  defaultValue: number;
  style: React.CSSProperties;
  centerComponent: React.ReactElement;
  offWarning: boolean;
}

const ROOT_STYLE: React.CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
};

const CENTER_STYLE: React.CSSProperties = {
  position: 'absolute',
  left: '50%',
  top: 0,
  transform: 'translateX(-50%)',
  pointerEvents: 'none',
};

export default class SlideRule extends React.PureComponent<IProps> {
  static defaultProps = {
    onChange: () => {},
    primaryStyles: { color: '#C4C4C4', width: 4, height: 30, top: 0 },
    secondaryStyles: { color: '#E4E4E4', width: 2, height: 15, top: 0 },
    textStyles: {
      size: '1.25em',
      family: 'Arial',
      color: 'rgba(0, 0, 0, 0.87)',
      top: 35,
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
  };

  state = { canvasWidth: 100 };

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
    if (!offWarning) this.validate();

    return (
      <div style={{ ...ROOT_STYLE, ...style }}>
        <Canvas {...rest} value={Number(value)} />
        <div style={CENTER_STYLE}>{centerComponent}</div>
      </div>
    );
  }
}
