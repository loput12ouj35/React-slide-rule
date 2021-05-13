# Props

This document lists all props of SlideRule component.

> Hint: Use suggestion/auto complete to find the props in your code editor.

> The `ref` is forwarded to the root `div` element.

| Name             | Type                                             | Default                       | Description                                                                                                     |
| ---------------- | ------------------------------------------------ | ----------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **step**         | number                                           | 1                             | The granularity that the `value` must adhere to (i.e., the difference between each smaller mark).               |
| **value**        | number                                           | 150                           | The value of the component. Should be evenly divisible by the `step`.                                           |
| **onChange**     | function                                         | (n) => n                      | **Signature**: `(v: number) => void`<br>Callback fired when the value is changed, providing the new value.      |
| **min**          | number                                           | 0                             | The minimum allowed value of the component. Should be evenly divisible by the `step`.                           |
| **max**          | number                                           | 300                           | The maximum allowed value of the component. Should be evenly divisible by the `step` and bigger than the `min`. |
| axis             | `'x'` \| `'y'` \| `'x-reverse'` \| `'y-reverse'` | 'x'                           | The main axis and the direction. The default values of some props depend on this prop.                          |
| **width**        | number                                           | 300<br>(y-axis: 75)           | The width of the `canvas` element in pixel.                                                                     |
| **height**       | number                                           | 75<br>(y-axis: 300)           | The height of the `canvas` element in pixel.                                                                    |
| gap              | number                                           | 10                            | The distance between each smaller mark in pixel.                                                                |
| style            | CSSProperties                                    |                               | Overrides or extends the style applied to the root `div` element.                                               |
| markStyle        | [MarkStyle](#MarkStyle)                          |                               | Overrides or extends the style applied to marks.                                                                |
| smallerMarkStyle | [MarkStyle](#MarkStyle)                          |                               | Overrides or extends the style applied to smaller marks.                                                        |
| numberStyle      | [NumberStyle](#NumberStyle)                      |                               | Overrides or extends the style applied to numbers.                                                              |
| unit             | string                                           | ''                            | The suffix of numbers.                                                                                          |
| cursor           | ReactElement                                     | [(See blow)](#default-cursor) | The cursor on the center of the component.                                                                      |
| ~~showWarning~~  | ~~boolean~~                                      | ~~false~~                     | ~~[experimental] Enables prop validation.~~                                                                     |

## Advanced

### MarkStyle

MarkStyle is an object type for the `markStyle` and `smallerMarkStyle`.
The following lists all properties of this type:

| Name   | Type            | Default<br>`markStyle` | Default<br>`smallerMarkStyle` | Description                                                                               |
| ------ | --------------- | ---------------------- | ----------------------------- | ----------------------------------------------------------------------------------------- |
| color  | BackgroundColor | '#C4C4C4'              | '#E4E4E4'                     | The background-color of marks.                                                            |
| width  | number          | 3<br>(y-axis: 30)      | 2<br>(y-axis: 15)             | The width of marks in pixel.                                                              |
| height | number          | 30<br>(y-axis: 3)      | 15<br>(y-axis: 2)             | The height of marks in pixel.                                                             |
| top    | number          | 0                      | 0                             | The vertical position of marks in pixel. No effect if the `axis` is 'y' or 'y-reverse'.   |
| left   | number          | 0                      | 0                             | The horizontal position of marks in pixel. No effect if the `axis` is 'x' or 'x-reverse'. |

### NumberStyle

NumberStyle is an object type for the `numberStyle`.
The following lists all properties of this type:

| Name         | Type                                                                                    | Default                      | Description                                                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| size         | FontSize                                                                                | '1.25em'                     | The font size of numbers.                                                                                                                                                     |
| family       | FontFamily                                                                              | 'Arial'                      | The font family of numbers.                                                                                                                                                   |
| color        | Color                                                                                   | 'rgba(0, 0, 0, 0.87)'        | The color of numbers.                                                                                                                                                         |
| top          | number                                                                                  | 36                           | The vertical position of numbers in pixel. No effect if the `axis` is 'y' or 'y-reverse'.                                                                                     |
| left         | number                                                                                  | 36                           | The horizontal position of numbers in pixel. No effect if the `axis` is 'x' or 'x-reverse'.                                                                                   |
| textAlign    | `'left'` \| `'right'` \| `'center'` \| `'start'` \| `'end'`                             | 'center'<br>(y-axis: 'left') | The text alignment used when drawing numbers. See [the API document](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign) for more details.   |
| textBaseline | `'top'` \| `'hanging'` \| `'middle'` \| `'alphabetic'` \| `'ideographic'` \| `'bottom'` | 'top'<br>(y-axis: 'middle')  | The text baseline used when drawing numbers. See [the API document](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline) for more details. |

### Default cursor

The default value of the `cursor` depends on the `axis`.

- x-axis

```jsx
<div style={{ width: 4, height: 35, backgroundColor: '#2AA' }} />
```

- y-axis

```jsx
<div style={{ width: 35, height: 4, backgroundColor: '#2AA' }} />
```
