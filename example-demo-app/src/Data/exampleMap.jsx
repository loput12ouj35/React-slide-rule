// Note that this file dose not define any component.
import React from 'react';
import {
  InputNumberExample,
  FullWidthExample,
  ResizeObserverExample,
  BasicExample,
  VerticalExample,
  CustomStyledExample,
  CustomCursorExample,
  RotateNumberExample,
} from 'Examples';

const prefixPath =
  'https://github.com/loput12ouj35/React-slide-rule/blob/main/example-demo-app/src/Examples/';

export default {
  basic: {
    fileName: `${prefixPath}Basic.jsx`,
    example: <BasicExample />,
  },
  'input-element': {
    fileName: `${prefixPath}InputNumber.jsx`,
    example: <InputNumberExample />,
  },
  vertical: {
    fileName: `${prefixPath}Vertical.jsx`,
    example: <VerticalExample />,
  },
  'custom-styled': {
    fileName: `${prefixPath}CustomStyled.jsx`,
    example: <CustomStyledExample />,
  },
  'rotate-number': {
    fileName: `${prefixPath}RotateNumber.jsx`,
    example: <RotateNumberExample />,
  },
  'custom-cursor': {
    fileName: `${prefixPath}CustomCursor.jsx`,
    example: <CustomCursorExample />,
  },
  'full-width': {
    fileName: `${prefixPath}FullWidth.jsx`,
    example: <FullWidthExample />,
  },
  'resize-observer': {
    fileName: `${prefixPath}ResizeObserver.jsx`,
    example: <ResizeObserverExample />,
  },
};
