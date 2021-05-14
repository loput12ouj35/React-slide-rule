import React from 'react';
import {
  InputNumberExample,
  FullWidthExample,
  ResizeObserverExample,
  BasicExample,
  VerticalExample,
  CustomStyledExample,
  CustomCursorExample,
} from 'Examples';
import ExampleItem from 'ExampleItem';

export default React.memo(function App() {
  return (
    <main>
      <h1>Demos</h1>
      <h2 id="basic">Basic</h2>
      <ul>
        <ExampleItem fileName="Basic" example={<BasicExample />} />
        <ExampleItem
          id="input-element"
          title="With an input element"
          fileName="InputNumber"
          example={<InputNumberExample />}
        />
        <ExampleItem
          id="vertical"
          title="Vertical example"
          fileName="Vertical"
          example={<VerticalExample />}
        />
      </ul>
      <h2 id="Advanced">Advanced</h2>
      <ul>
        <ExampleItem
          id="custom-styled"
          title="Custom Styled"
          fileName="CustomStyled"
          example={<CustomStyledExample />}
        />
        <ExampleItem
          id="custom-cursor"
          title="Custom cursor"
          subheader="Numbers above marks"
          fileName="CustomCursor"
          example={<CustomCursorExample />}
        />
        <ExampleItem
          id="full-width"
          title="Full width"
          subheader="By using the ref of a wrapper, you can stretch the component to its width. Notice that the component will not resize."
          fileName="FullWidth"
          example={<FullWidthExample />}
        />
        <ExampleItem
          id="resize-observer"
          title="Full width + ResizeObserver"
          subheader="By using ResizeObserver, the component "
          fileName="ResizeObserver"
          example={<ResizeObserverExample />}
        />
      </ul>
      <h2>Playgournd</h2>
      <p>(todo)</p>
    </main>
  );
});
