// Note that this file does not define any components.
import {
  BasicExample,
  CustomCursorExample,
  CustomStyledExample,
  FullWidthExample,
  InputNumberExample,
  ResizeObserverExample,
  RotateNumberExample,
  VerticalExample,
  MultiplePointersExample,
} from '../Examples';

const prefixPath =
  'https://github.com/loput12ouj35/React-slide-rule/blob/main/example-demo-app/src/Examples/';

export default {
  basic: {
    fileName: `${prefixPath}Basic.tsx`,
    example: <BasicExample />,
  },
  'input-element': {
    fileName: `${prefixPath}InputNumber.tsx`,
    example: <InputNumberExample />,
  },
  vertical: {
    fileName: `${prefixPath}Vertical.tsx`,
    example: <VerticalExample />,
  },
  'custom-styled': {
    fileName: `${prefixPath}CustomStyled.tsx`,
    example: <CustomStyledExample />,
  },
  'rotate-number': {
    fileName: `${prefixPath}RotateNumber.tsx`,
    example: <RotateNumberExample />,
  },
  'custom-cursor': {
    fileName: `${prefixPath}CustomCursor.tsx`,
    example: <CustomCursorExample />,
  },
  'full-width': {
    fileName: `${prefixPath}FullWidth.tsx`,
    example: <FullWidthExample />,
  },
  'window-resize-observer': {
    fileName: `${prefixPath}ResizeObserver.tsx`,
    example: <ResizeObserverExample />,
  },
  'multiple-pointers': {
    fileName: `${prefixPath}MultiplePointers.tsx`,
    example: <MultiplePointersExample />,
  },
};
