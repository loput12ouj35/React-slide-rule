import React from 'react';

export interface TouchPoint {
  time: number;
  shift: number;
}

export type Axis = 'x' | 'y' | 'x-reverse' | 'y-reverse';

export interface MarkStyle {
  color?: React.CSSProperties['backgroundColor'];
  width?: number;
  height?: number;
  top?: number;
  left?: number;
}

export interface NumberStyle {
  size?: React.CSSProperties['fontSize'];
  family?: React.CSSProperties['fontFamily'];
  color?: React.CSSProperties['color'];
  top?: number;
  left?: number;
  textAlign?: 'left' | 'right' | 'center' | 'start' | 'end';
  textBaseline?:
    | 'top'
    | 'hanging'
    | 'middle'
    | 'alphabetic'
    | 'ideographic'
    | 'bottom';
  rotate: number;
}

export interface SlideRuleProps {
  onChange?: (_v: number) => void;
  width?: number;
  height?: number;
  markStyle?: MarkStyle;
  smallerMarkStyle?: MarkStyle;
  numberStyle?: NumberStyle;
  unit?: string;
  gap?: number;
  step?: number;
  max?: number;
  min?: number;
  value?: number;
  style?: React.CSSProperties;
  cursor?: React.ReactElement;
  showWarning?: boolean;
  axis?: Axis;
}
