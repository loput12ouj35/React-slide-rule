import React from 'react';
import drawingUtil from './drawingUtil';
import styles from './styles.ts';
import util from './util';

export default class Canvas extends React.PureComponent {
  coordinate = 0;

  isTouching = false;

  touchPoints = [];

  state = { translate: 0 };

  browserEnv = Boolean(window.ontouchstart);

  canvasRef = React.createRef();

  // eslint-disable-next-line react/destructuring-assignment
  currentValue = this.props.value;

  componentDidMount() {
    this.drawCanvas();
  }

  componentDidUpdate() {
    this.drawCanvas();
  }

  getCoordinate = (e) => {
    const { pageX, pageY } = e.touches?.[0] ?? e;
    const { direction } = this.props;

    switch (direction) {
      case 'column':
        return pageY;
      default:
        return pageX;
    }
  };

  handleTouchStart = (e) => {
    if (this.isTouching) return;

    this.isTouching = true;
    const coordinate = this.getCoordinate(e);
    this.addTouchPoint(coordinate);
    this.coordinate = coordinate;
  };

  handleTouchMove = (e) => {
    if (!this.isTouching) return;

    const coordinate = this.getCoordinate(e);
    this.addTouchPoint(coordinate);
    const delta = coordinate - this.coordinate;

    const { gap } = this.props;
    if (Math.abs(delta) < gap) return;
    if (this.rebound(delta)) return;

    this.coordinate = coordinate;
    this.moveGradations(delta);
  };

  handleTouchEnd = () => {
    if (!this.isTouching) return;
    this.isTouching = false;
    if (this.browserEnv)
      this.moveGradations(util.calcInertialShfitInPx(this.touchPoints));
    this.setState({ translate: 0 });
    this.touchPoints = [];
  };

  addTouchPoint = (shift) =>
    this.touchPoints.push({ time: new Date().getTime(), shift });

  rebound(delta) {
    const { max, min } = this.props;

    if (!util.isOverBoundary({ max, min, delta, value: this.currentValue }))
      return false;

    const translate = util.calcReboundTranslate(delta);
    this.setState({ translate });
    return true;
  }

  moveGradations(delta) {
    const { gap, precision, onChange } = this.props;
    const diff = Math.round(-delta / gap);
    let moveValue = Math.abs(diff);

    const draw = () => {
      if (moveValue < 1) {
        if (precision >= 1) return onChange(this.currentValue);
        const decimalPlace = util.calcNumberOfDecimalPlace(precision);
        return onChange(Number(this.currentValue.toFixed(decimalPlace)));
      }
      this.currentValue += Math.sign(diff) * precision;
      moveValue -= [64, 16, 4].find((n) => moveValue > n) ?? 1;
      this.drawCanvas();
      return window.requestAnimationFrame(draw);
    };

    window.requestAnimationFrame(draw);
  }

  drawCanvas() {
    const { min, max, precision, gap } = this.props;
    this.currentValue = util.adjustValue({
      max,
      min,
      precision,
      value: this.currentValue,
    });
    const canvas = this.canvasRef.current;
    const { direction, width, height } = this.props;
    const basis = util.getBasis(direction, width, height);

    if (!canvas) return;
    const { from, to, calcGradationCoordinate } = util.calcFromTo({
      max,
      min,
      precision,
      gap,
      basis,
      value: this.currentValue,
    });
    const { primaryStyle, secondaryStyle, textStyle } = this.props;

    drawingUtil.drawCanvas({
      canvas,
      precision,
      primaryStyle,
      secondaryStyle,
      textStyle,
      from,
      to,
      calcGradationCoordinate,
      direction,
    });
  }

  render() {
    const { width, height, value = null, direction } = this.props;
    const { translate } = this.state;
    if (value !== null) this.currentValue = value;

    return (
      <canvas
        ref={this.canvasRef}
        width={width}
        height={height}
        style={styles.createCanvasStyle(direction, translate)}
        onTouchStart={this.handleTouchStart}
        onMouseDown={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onMouseMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onMouseUp={this.handleTouchEnd}
        onMouseLeave={this.handleTouchEnd}
      />
    );
  }
}
