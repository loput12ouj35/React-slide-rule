import React from 'react';
import {
  InputNumberExample,
  FullWidthExample,
  ResizeObserverExample,
  BasicExample,
  VerticalExample,
  CustomStylesExample,
  CustomCursorExample,
  Playground,
} from 'Examples';

export default React.memo(function App() {
  return (
    <main>
      <h1>Live demo</h1>
      <ol>
        <li>
          <h3>Basic example</h3>
          <BasicExample />
        </li>
        <li>
          <h3>With an input element</h3>
          <InputNumberExample />
        </li>
        <li>
          <h3>Vertical &amp; unit</h3>
          <VerticalExample />
        </li>
        <li>
          <h3>Custom styles</h3>
          <CustomStylesExample />
        </li>
        <li>
          <h3>Custom cursor &amp; Text over marks</h3>
          <CustomCursorExample />
        </li>
        <li>
          <h3>Full width (no resize)</h3>
          <FullWidthExample />
        </li>
        <li>
          <h3>Full width with ResizeObserver</h3>
          <ResizeObserverExample />
        </li>
      </ol>
      {/* <h3>Playgorund</h3>
      <Playground /> */}
    </main>
  );
});
