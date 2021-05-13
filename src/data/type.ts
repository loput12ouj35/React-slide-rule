import React from 'react';
import { Property } from 'csstype';

export interface TouchPoint {
  time: number;
  shift: number;
}

export type Axis = 'x' | 'y' | 'x-reverse' | 'y-reverse';

export interface SlideRuleProps {
  onChange?: (v: number) => void;
  width?: number;
  height?: number;
  markStyle?: {
    color?: Property.BackgroundColor;
    width?: number;
    height?: number;
    top?: number;
    left?: number;
  };
  smallerMarkStyle?: {
    color?: Property.BackgroundColor;
    width?: number;
    height?: number;
    top?: number;
    left?: number;
  };
  numberStyle?: {
    size?: Property.FontSize;
    family?: Property.FontFamily;
    color?: Property.Color;
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
  };
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
