# react-slide-rule

[![npm](https://img.shields.io/npm/v/react-slide-rule.svg)](https://www.npmjs.com/package/react-slide-rule)
[![npm](https://img.shields.io/npm/l/react-slide-rule.svg)](https://www.npmjs.com/package/react-slide-rule)

React-slide-rule is a React component shaped like a ruler/slide rule, allowing users to select a value along a subjective range and step.

> More demos available [here](https://loput12ouj35.github.io/React-slide-rule/)!

![examples](https://github.com/loput12ouj35/React-slide-rule/raw/main/docs/examples.gif)

## Installation

```shell
npm install react-slide-rule
```

## Simple example

![simple-example](https://github.com/loput12ouj35/React-slide-rule/raw/main/docs/simple-example.gif)

```jsx
import React, { useState } from 'react';
import SlideRule from 'react-slide-rule';

const STYLE = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export default function () {
  const [value, setValue] = useState(150);

  return (
    <div style={STYLE}>
      <p>{value}</p>
      <SlideRule value={value} onChange={setValue} />
    </div>
  );
}
```

## More examples

Check out the [example codes](https://github.com/loput12ouj35/React-slide-rule/tree/main/example-demo-app/src/Examples) in the repository, or [demos](https://loput12ouj35.github.io/React-slide-rule/).

## Props

A list of all props available [here](https://github.com/loput12ouj35/React-slide-rule/tree/main/docs/props.md).

> Hint: Use suggestion/auto complete to find the props in your code editor.

## License

This project is licensed under the [MIT license](https://github.com/loput12ouj35/React-slide-rule/blob/main/LICENSE).
