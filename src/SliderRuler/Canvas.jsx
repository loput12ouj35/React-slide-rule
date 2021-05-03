import React from 'react';
import drawingUtil from './drawingUtil';
import util from './util';

const CANVAS_STYLE = {
  display: 'block',
  margin: '0 auto',
  transitionDuration: '300ms',
};

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

    if (Math.abs(deltaX) < this.props.divide) return;
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

  addTouchPoint = (shift) => {
    const time = new Date().getTime();
    this.touchPoints.push({ time, shift });
  };

  rebound = (deltaX) => {
    const { max, min } = this.props;

    if (!util.isOverBoundary({ max, min, deltaX, value: this.currentValue }))
      return false;

    const translateX = util.calcReboundTranslateX(deltaX);
    this.setState({ translateX });
    return true;
  };

  moveGradations = (diffPx) => {
    const { divide, precision, onChange } = this.props;
    const diff = Math.round(-diffPx / divide);
    let moveValue = Math.abs(diff);

    const draw = () => {
      if (moveValue < 1) {
        if (precision >= 1) return onChange(this.currentValue);
        const decimalPlace = util.calcNumberOfDecimalPlace(precision);
        return onChange(Number(this.currentValue.toFixed(decimalPlace)));
      }
      this.currentValue += Math.sign(diff) * precision;
      moveValue -= [64, 16, 4].find((n) => moveValue > n) ?? 1;
      this.calcValueAndDrawCanvas();
      window.requestAnimationFrame(draw);
    };

    window.requestAnimationFrame(draw);
  };

  calcFromTo = (value) => {
    const { min, max, precision, divide, width } = this.props;
    const halfWidth = width / 2;
    const diffCurrentMin = ((value - min) * divide) / precision;
    const _startValue = value - Math.floor(halfWidth / divide) * precision;
    const startValue = Math.max(min, Math.min(_startValue, max));
    const _endValue = startValue + (width / divide) * precision;
    const endValue = Math.min(_endValue, max);
    const originX =
      diffCurrentMin > halfWidth
        ? halfWidth - ((value - startValue) * divide) / precision
        : halfWidth - diffCurrentMin;

    const from = Math.round(startValue / precision);
    const to = endValue / precision;
    const calcX = (i) => originX + (i - startValue / precision) * divide;
    return { from, to, calcX };
  };

  drawCanvas = ({ from, to, calcX }) => {
    const canvas = this.canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { primaryStyles, secondaryStyles, textStyles } = this.props;
    const { precision } = this.props;

    for (let i = from; i <= to; i++) {
      const x = calcX(i);

      ctx.beginPath();
      if (i % 10 === 0) {
        drawingUtil.drawLine(ctx, x, primaryStyles);
        const text = drawingUtil.calcNumberText(i, precision);
        drawingUtil.drawNumberText(ctx, text, x, textStyles);
      } else drawingUtil.drawLine(ctx, x, secondaryStyles);

      ctx.closePath();
    }
  };

  calcValueAndDrawCanvas = () => {
    const { min, max, precision } = this.props;
    this.currentValue = util.adjustValue({
      max,
      min,
      precision,
      value: this.currentValue,
    });
    this.drawCanvas(this.calcFromTo(this.currentValue));
  };

  componentDidMount() {
    this.calcValueAndDrawCanvas();
  }

  componentDidUpdate() {
    this.calcValueAndDrawCanvas();
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
        style={{ ...CANVAS_STYLE, transform: `translateX(${translateX}px)` }}
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

// Log10 polyfill. IE does not support log10.
Math.log10 =
  Math.log10 ||
  function (x) {
    return Math.log(x) * Math.LOG10E;
  };

// memo
// 1. 스타일을 매번 생성할 필요가 없음. state 변경시에만 새로 생성되게 하자
// 2. canvas의 width, height 설정과 상위 div와 관련없게 할수 없나 + props.style 제거
// 5. 세로 표현 어케하지? rotation으로 할까?
// 6. mouseleave때문에 pointerEvents 넣었는데, IE 11미만은 안 되네
// 7. min/max가 precision의 배수여야 함
// 8. value도 precision의 배수여야 함
