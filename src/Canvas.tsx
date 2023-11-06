import React, { useEffect, useRef, useState } from 'react';
import drawingUtil from './utils/drawingUtil';
import styles from './data/styles';
import util from './utils/common';
import { Axis, MarkStyle, NumberStyle, TouchPoint } from './data/type';

type TouchType =
  | React.TouchEvent<HTMLCanvasElement>
  | React.MouseEvent<HTMLCanvasElement>;

interface Props {
  width?: number;
  height?: number;
  min: number;
  max: number;
  step: number;
  gap: number;
  value: number;
  unit: string;
  axis: Axis;
  onChange: (_v: number) => void;
  markStyle: MarkStyle;
  smallerMarkStyle: MarkStyle;
  numberStyle: NumberStyle | MarkStyle;
}

export default function Canvas({
  axis,
  height,
  width,
  value,
  gap,
  max,
  min,
  step,
  onChange,
  markStyle,
  numberStyle,
  smallerMarkStyle,
  unit,
}: Props) {
  const [translate, setTranslate] = useState(0);

  const currentValue = useRef<number>(value);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isTouchingRef = useRef<boolean>(false);
  const coordinateRef = useRef<number>(0);
  const touchPointsRef = useRef<TouchPoint[]>([]);
  const browserEnv = useRef(Boolean(window.ontouchstart));

  function isXAxis() {
    return axis === 'x' || axis === 'x-reverse';
  }

  function isReverseAxis() {
    return axis === 'x-reverse' || axis === 'y-reverse';
  }

  function getCoordinate(e: unknown): number {
    const { pageX, pageY } =
      (e as React.TouchEvent<HTMLCanvasElement>).touches?.[0] ?? e;
    return isXAxis() ? pageX : pageY;
  }

  function rebound(delta: number) {
    if (
      !util.isOverBoundary({
        max,
        min,
        delta: isReverseAxis() ? -delta : delta,
        value: currentValue.current,
      })
    )
      return false;

    const calculatedTranslate = util.calcReboundTranslate(delta);
    setTranslate(calculatedTranslate);
    return true;
  }

  function handleTouchStart(e: TouchType) {
    if (isTouchingRef.current) return;

    isTouchingRef.current = true;
    const coordinate = getCoordinate(e);
    addTouchPoint(coordinate);
    coordinateRef.current = coordinate;
  }

  function addTouchPoint(shift: number) {
    touchPointsRef.current.push({ time: new Date().getTime(), shift });
  }

  function handleTouchMove(e: TouchType) {
    if (!isTouchingRef.current) return;

    const coordinate = getCoordinate(e);

    addTouchPoint(coordinate);

    const delta = coordinate - coordinateRef.current;

    if (Math.abs(delta) < gap) return;

    if (rebound(delta)) return;

    coordinateRef.current = coordinate;

    moveGradations(delta);
  }

  function handleTouchEnd() {
    if (!isTouchingRef.current) return;
    isTouchingRef.current = false;

    if (browserEnv.current) {
      moveGradations(util.calcInertialShfitInPx(touchPointsRef.current));
    }
    setTranslate(0);
    touchPointsRef.current = [];
  }

  function moveGradations(delta: number) {
    const diffInPx = isReverseAxis() ? delta : -delta;
    const diff = Math.round(diffInPx / gap);
    const increment = Math.sign(diff) * step; // value increment
    let speed = Math.abs(diff); // for sliding

    const draw = () => {
      if (speed < 1) {
        if (step >= 1) return onChange(currentValue.current);
        const decimalPlace = util.countDecimalPlace(step);
        return onChange(Number(currentValue.current.toFixed(decimalPlace)));
      }
      currentValue.current += increment;
      speed -= speed > 8 ? 2 : 1;
      drawCanvas();
      return window.requestAnimationFrame(draw);
    };

    window.requestAnimationFrame(draw);
  }

  function drawCanvas() {
    currentValue.current = util.adjustValue({
      max,
      min,
      step,
      value: currentValue.current,
    });
    const canvas = canvasRef.current;

    const basis = isXAxis() ? width : height;

    if (!canvas) return;

    const { from, to, calcMarkCoordinate } = util.calcFromTo({
      step,
      gap,
      basis: basis!,
      value: currentValue.current,
      isReverseAxis: isReverseAxis(),
    });

    drawingUtil.drawCanvas({
      canvas,
      step,
      markStyle,
      smallerMarkStyle,
      numberStyle,
      unit,
      min,
      max,
      from,
      to,
      calcMarkCoordinate,
      isXAxis: isXAxis(),
    });
  }

  useEffect(() => {
    drawCanvas();
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={styles.createCanvasStyle(translate, isXAxis())}
        onTouchStart={handleTouchStart}
        onMouseDown={handleTouchStart}
        onTouchMove={handleTouchMove}
        onMouseMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
      />
      <input value={value} type="hidden" />
    </>
  );
}
