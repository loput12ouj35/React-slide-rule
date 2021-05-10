import React from 'react';
import { Property } from 'csstype';

export interface TouchPoint {
  time: number;
  shift: number;
}

export interface SlideRuleProps {
  onChange: (v: number) => any;
  width: number;
  height: number;
  primaryStyle: {
    color: Property.BackgroundColor;
    width: number;
    height: number;
    top?: number;
    left?: number;
  };
  secondaryStyle: {
    color: Property.BackgroundColor;
    width: number;
    height: number;
    top?: number;
    left?: number;
  };
  textStyle: {
    size: Property.FontSize;
    family: Property.FontFamily;
    color: Property.Color;
    top?: number;
    left?: number;
    textAlign: 'left' | 'right' | 'center' | 'start' | 'end';
    textBaseline:
      | 'top'
      | 'hanging'
      | 'middle'
      | 'alphabetic'
      | 'ideographic'
      | 'bottom';
  };
  gap: number;
  precision: number;
  max: number;
  min: number;
  value: number;
  style?: React.CSSProperties;
  cursor: React.ReactElement;
  offWarning: boolean;
  direction: 'row' | 'column';
  // direction: 'row' | 'column' | 'column-reverse' | 'row-reverse';
}
