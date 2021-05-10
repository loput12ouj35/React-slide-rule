import React from 'react';
import {
  InputNumberExample,
  FullWidthExample,
  ResizeObserverExample,
  BasicExample,
  Playground,
  VerticalExample,
} from 'Examples';

export default React.memo(function App() {
  return (
    <main>
      <h3>Basic</h3>
      <BasicExample />
      <h3>With an input element</h3>
      <InputNumberExample />
      <h3>Full width</h3>
      <FullWidthExample />
      <h3>Full width with ResizeObserver</h3>
      <ResizeObserverExample />
      <h3>Vertical</h3>
      <VerticalExample />
      {/* <h3>Playgorund</h3>
      <Playground /> */}
    </main>
  );
});
