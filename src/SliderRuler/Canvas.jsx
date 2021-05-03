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
  currentValue = this.props.defaultValue;

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
    this.moveGradations(this.inertialShift());
    this.setState({ translateX: 0 });
    this.touchPoints = [];
  };

  addTouchPoint = (shift) => {
    const time = new Date().getTime();
    this.touchPoints.push({ time, shift });
  };

  inertialShift = () => {
    if (!this.browserEnv) return 0;
    if (this.touchPoints.length < 4) return 0;
    const [first, , , last] = this.touchPoints.slice(-4);
    const v = ((last.shift - first.shift) / (last.time - first.time)) * 1000;
    return Math.sign(v) * Math.min(v ** 2 / 12000, 1000);
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

  moveGradations = (shift) => {
    const { divide, precision } = this.props;
    const moveValue = Math.round(-shift / divide);
    let _moveValue = Math.abs(moveValue);
    const draw = () => {
      if (_moveValue < 1) return this.props.onChange(this.currentValue);
      this.currentValue += Math.sign(moveValue) * precision;
      this.calcValueAndDrawCanvas();
      window.requestAnimationFrame(draw);
      _moveValue--;
    };

    draw();
  };

  calcValue = () => {
    const { min, max, precision } = this.props;
    const value = Math.max(min, Math.min(this.currentValue, max));
    return (Math.round((value * 10) / precision) * precision) / 10;
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

    const from = Math.round((startValue / precision) * 10) / 10;
    const to = endValue / precision;
    const calcX = (i) => originX + (i - startValue / precision) * divide;
    return { from, to, calcX };
  };

  drawCanvas = ({ from, to, calcX }) => {
    const canvas = this.canvasRef.current;
    if (!canvas) return;

    const { primaryStyles, secondaryStyles, precision } = this.props;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = from; i <= to; i++) {
      const x = calcX(i);

      ctx.beginPath();
      if (i % 10 === 0) {
        this.drawLine(ctx, x, primaryStyles);
        const number = Math.round(i / 10) * (precision * 10);
        this.drawNumber(ctx, number, x);
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

  drawNumber = (ctx, number, x) => {
    const { size, family, color, top } = this.props.textStyles;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = `${size} ${family}`;
    ctx.fillText(number, x, top);
  };

  calcValueAndDrawCanvas = () => {
    const value = this.calcValue();
    this.drawCanvas(this.calcFromTo(value));
    this.currentValue = value;
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

// memo
// 1. 스타일을 매번 생성할 필요가 없음. state 변경시에만 새로 생성되게 하자
// 2. canvas의 width, height 설정과 상위 div와 관련없게 할수 없나 + props.style 제거
// 3. precision이 소수일 때의 처리
// 4. 관성 어색함
// 5. 세로 표현 어케하지? rotation으로 할까?
// 6. mouseleave때문에 pointerEvents 넣었는데, IE 11미만은 안 되네
