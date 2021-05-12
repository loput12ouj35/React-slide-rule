import React from 'react';
import drawingUtil from './utils/drawingUtil';
import styles from './data/styles';
import util from './utils/common';

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

  get isXAxis() {
    const { axis } = this.props;
    return axis === 'x' || axis === 'x-reverse';
  }

  get isReverseAxis() {
    const { axis } = this.props;
    return axis === 'x-reverse' || axis === 'y-reverse';
  }

  getCoordinate = (e) => {
    const { pageX, pageY } = e.touches?.[0] ?? e;
    return this.isXAxis ? pageX : pageY;
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
    const direction = this.isReverseAxis ? -1 : 1;
    const { gap, precision, onChange } = this.props;
    const diff = Math.round(-delta / gap) * direction;
    const increment = Math.sign(diff) * precision; // value increment
    let speed = Math.abs(diff); // for sliding

    const draw = () => {
      if (speed < 1) {
        if (precision >= 1) return onChange(this.currentValue);
        const decimalPlace = util.countDecimalPlace(precision);
        return onChange(Number(this.currentValue.toFixed(decimalPlace)));
      }
      this.currentValue += increment;
      speed -= speed > 8 ? 2 : 1;
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
    const { width, height } = this.props;
    const basis = this.isXAxis ? width : height;

    if (!canvas) return;
    const { from, to, calcMarkCoordinate } = util.calcFromTo({
      precision,
      gap,
      basis,
      value: this.currentValue,
      isReverseAxis: this.isReverseAxis,
    });
    const { majorStyle, minorStyle, textStyle, unit } = this.props;

    drawingUtil.drawCanvas({
      canvas,
      precision,
      majorStyle,
      minorStyle,
      textStyle,
      unit,
      min,
      max,
      from,
      to,
      calcMarkCoordinate,
      isXAxis: this.isXAxis,
    });
  }

  render() {
    const { width, height, value = null } = this.props;
    const { translate } = this.state;
    if (value !== null) this.currentValue = value;

    return (
      <>
        <canvas
          ref={this.canvasRef}
          width={width}
          height={height}
          style={styles.createCanvasStyle(translate, this.isXAxis)}
          onTouchStart={this.handleTouchStart}
          onMouseDown={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onMouseMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          onMouseUp={this.handleTouchEnd}
          onMouseLeave={this.handleTouchEnd}
        />
        <input value={this.currentValue} type="hidden" />
      </>
    );
  }
}
