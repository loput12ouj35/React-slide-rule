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
      <ul className="example-list">
        <li>
          <h3 id="basic">Basic example</h3>
          <BasicExample />
        </li>
        <li>
          <h3 id="input-element">With an input element</h3>
          <InputNumberExample />
        </li>
        <li>
          <h3 id="vertical">Vertical &amp; unit</h3>
          <VerticalExample />
        </li>
        <li>
          <h3 id="custom-style">Custom styles</h3>
          <CustomStylesExample />
        </li>
        <li>
          <h3 id="custom-cursor">Custom cursor &amp; Numbers above marks</h3>
          <CustomCursorExample />
        </li>
        <li>
          <h3 id="full-width">Full width (no resize)</h3>
          <FullWidthExample />
        </li>
        <li>
          <h3 id="resize-observer">Full width with ResizeObserver</h3>
          <ResizeObserverExample />
        </li>
      </ul>
      {/* <h3>Playgorund</h3>
      <Playground /> */}
    </main>
  );
});
