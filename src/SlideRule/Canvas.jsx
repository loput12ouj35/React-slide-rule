import React from 'react';
import drawingUtil from './drawingUtil';
import styles from './styles.ts';
import util from './util';

export default class Canvas extends React.PureComponent {
  pageX = 0;
  isTouching = false;
  touchPoints = [];
  state = { translateX: 0 };
  browserEnv = window.hasOwnProperty('ontouchstart');
  canvasRef = React.createRef();
  currentValue = this.props.value;

  handleTouchStart = (e) => {
    if (this.isTouching) return;

    this.isTouching = true;
    const { pageX } = e.touches?.[0] || e;
    this.addTouchPoint(pageX);
    this.pageX = pageX;
  };

  handleTouchMove = (e) => {
    if (!this.isTouching) return;

    const { pageX } = e.touches?.[0] || e;
    this.addTouchPoint(pageX);
    const deltaX = pageX - this.pageX;

    if (Math.abs(deltaX) < this.props.gap) return;
    if (this.rebound(deltaX)) return;

    this.pageX = pageX;
    this.moveGradations(deltaX);
  };

  handleTouchEnd = () => {
    if (!this.isTouching) return;
    this.isTouching = false;
    if (this.browserEnv)
      this.moveGradations(util.calcInertialShfitInPx(this.touchPoints));
    this.setState({ translateX: 0 });
    this.touchPoints = [];
  };

  addTouchPoint = (shift) =>
    this.touchPoints.push({ time: new Date().getTime(), shift });

  rebound(deltaX) {
    const { max, min } = this.props;

    if (!util.isOverBoundary({ max, min, deltaX, value: this.currentValue }))
      return false;

    const translateX = util.calcReboundTranslateX(deltaX);
    this.setState({ translateX });
    return true;
  }

  moveGradations(diffPx) {
    const { gap, precision, onChange } = this.props;
    const diff = Math.round(-diffPx / gap);
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
      window.requestAnimationFrame(draw);
    };

    window.requestAnimationFrame(draw);
  }

  drawCanvas() {
    const { min, max, precision, gap, width } = this.props;
    this.currentValue = util.adjustValue({
      max,
      min,
      precision,
      value: this.currentValue,
    });
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    const { primaryStyles, secondaryStyles, textStyles } = this.props;
    const { from, to, calcX } = util.calcFromTo({
      max,
      min,
      precision,
      gap,
      width,
      value: this.currentValue,
    });

    drawingUtil.drawCanvas({
      canvas,
      precision,
      primaryStyles,
      secondaryStyles,
      textStyles,
      from,
      to,
      calcX,
    });
  }

  componentDidMount() {
    this.drawCanvas();
  }

  componentDidUpdate() {
    this.drawCanvas();
  }

  render() {
    const { width, height, value = null } = this.props;
    const { translateX } = this.state;
    if (value !== null) this.currentValue = value;

    return (
      <canvas
        ref={this.canvasRef}
        width={width}
        height={height}
        style={styles.createCanvasStyle(translateX)}
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

// memo
// 5. 세로 표현 어케하지? rotation으로 할까?
// 6. mouseleave때문에 pointerEvents 넣었는데, IE 11미만은 안 되네
