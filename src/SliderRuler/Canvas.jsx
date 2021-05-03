import React from 'react';

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
    this.moveGradations(this.calcInertialShfitInPx());
    this.setState({ translateX: 0 });
    this.touchPoints = [];
  };

  addTouchPoint = (shift) => {
    const time = new Date().getTime();
    this.touchPoints.push({ time, shift });
  };

  calcInertialShfitInPx = () => {
    if (!this.browserEnv) return 0;
    if (this.touchPoints.length < 4) return 0;
    const [first, , , last] = this.touchPoints.slice(-4);
    const v = ((last.shift - first.shift) / (last.time - first.time)) * 1000;
    return (Math.sign(v) * v ** 2) / 12000;
  };

  rebound = (deltaX) => {
    const { max, min } = this.props;

    if (
      (this.currentValue !== min || deltaX <= 0) &&
      (this.currentValue !== max || deltaX >= 0)
    )
      return false;

    const translateX = Math.sign(deltaX) * 1.5988 * Math.abs(deltaX) ** 0.7962;
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
        const decimalPlace = this.calcNumberOfDecimalPlace(precision);
        return onChange(Number(this.currentValue.toFixed(decimalPlace)));
      }
      this.currentValue += Math.sign(diff) * precision;
      moveValue -= [64, 16, 4].find((n) => moveValue > n) ?? 1;
      this.calcValueAndDrawCanvas();
      window.requestAnimationFrame(draw);
    };

    window.requestAnimationFrame(draw);
  };

  adjustValue = (v) => {
    const { min, max, precision } = this.props;
    const value = Math.max(min, Math.min(v, max));
    return Math.round(value / precision) * precision;
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

    const { primaryStyles, secondaryStyles } = this.props;
    for (let i = from; i <= to; i++) {
      const x = calcX(i);

      ctx.beginPath();
      if (i % 10 === 0) {
        this.drawLine(ctx, x, primaryStyles);
        const text = this.calcNumberText(i);
        this.drawNumberText(ctx, text, x);
      } else this.drawLine(ctx, x, secondaryStyles);

      ctx.closePath();
    }
  };

  drawLine = (ctx, x, { width, height, color, top }) => {
    ctx.moveTo(x, top);
    ctx.lineWidth = width;
    ctx.lineTo(x, height);
    ctx.strokeStyle = color;
    ctx.stroke();
  };

  calcNumberText = (i) => {
    const { precision } = this.props;
    const number = i * precision;
    if (precision >= 0.1) return number;
    const decimalPlace = this.calcNumberOfDecimalPlace(precision);
    return number.toFixed(decimalPlace - 1);
  };

  calcNumberOfDecimalPlace = (precision) => -Math.floor(Math.log10(precision));

  drawNumberText = (ctx, text, x) => {
    const { size, family, color, top } = this.props.textStyles;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = `${size} ${family}`;
    ctx.fillText(text, x, top);
  };

  calcValueAndDrawCanvas = () => {
    this.currentValue = this.adjustValue(this.currentValue);
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
