# Props

This document lists all props of SlideRule component.

> Hint: Use suggestion/auto complete to find the props in your code editor.

> The **ref** is forwarded to the root element.

| Name        | Type               | Default  | Description                          |
| ----------- | ------------------ | -------- | ------------------------------------ |
| axis        | enum['x','y']      | x        |
| value       | number             | 150      | The current value of this component. |
| onChange    | function(number)   | (n) => n |
| min         | number             | 300      |
| max         | number             | 0        |
| precision   | number             | 1        |
| width       | number             |          |
| height      | number             |          |
| gap         | number             | 10       |
| style       | CSSProperties      |          |
| cursor      | ReactElement       |          |
| majorStyle  | object (see below) |          |
| minorStyle  | object (see below) |          |
| textStyle   | object (see below) |          |
| unit        | string             |          |
| showWarning | boolean            | false    |
