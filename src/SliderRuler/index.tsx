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
  divide: number;
  precision: number;
  max: number;
  min: number;
  value: number;
  defaultValue: number;
  style: React.CSSProperties;
  centerComponent: React.ReactElement;
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

export default class SliderRuler extends React.PureComponent<IProps> {
  static defaultProps = {
    onChange: () => {},
    primaryStyles: { color: '#C4C4C4', width: 4, height: 30, top: 0 },
    secondaryStyles: { color: '#E4E4E4', width: 2, height: 15, top: 7 },
    textStyles: {
      size: '1.25em',
      family: 'Arial',
      color: 'rgba(0, 0, 0, 0.87)',
      top: 35,
    },
    height: 55,
    divide: 10,
    precision: 1,
    max: 300,
    min: 0,
    // value: 150,
    defaultValue: 30,
    style: {
      width: '100%',
    },
    centerComponent: (
      <div style={{ width: 3, height: 35, backgroundColor: 'blue' }} />
    ),
  };

  state = { canvasWidth: 100 };
  rootRef = React.createRef<HTMLDivElement>();

  adjustSize = () => {
    if (!this.rootRef.current) return;
    this.setState({ canvasWidth: this.rootRef.current.offsetWidth });
  };

  componentDidMount() {
    this.adjustSize();
  }

  componentDidUpdate() {
    this.adjustSize();
  }

  render() {
    const { style, centerComponent, ...rest } = this.props;
    const { canvasWidth } = this.state;

    return (
      <div ref={this.rootRef} style={{ ...ROOT_STYLE, ...style, color: '' }}>
        <Canvas {...rest} width={canvasWidth} />
        <div style={CENTER_STYLE}>{centerComponent}</div>
      </div>
    );
  }
}
