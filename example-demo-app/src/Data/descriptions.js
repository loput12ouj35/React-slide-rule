export default {
  main:
    ' allows users to select a value along a subjectvie range and step.\nThis application lists demos of the component.',
  basic: {
    subheader:
      "Let's get started with a simple example that has a value and callback that updates the value.",
  },
  'input-element': {
    title: 'Slide rule with an input element',
    subheader: 'In this example, the component and input element share state.',
  },
  vertical: {
    title: 'Vertical slide rules & unit',
    subheader:
      'You can use vertical slide rules by setting the "axis" to "y" or "y-reverse".\nThe text provided with the "unit" is attached to each number.',
  },
  'custom-styled': {
    title: 'Custom styled mark & number',
    subheader:
      'You can customize the styles of marks and numbers. You can also change the gap between each mark.',
  },
  'custom-cursor': {
    title: 'Custom cursor & positioning',
    subheader:
      'You can use any React element as a cursor, set the position of marks, and place numbers above the marks.',
  },
  'full-width': {
    title: 'Full width',
    subheader:
      'By using the ref of the parent element, the component can stretch to its width.\nNotice that the component will never resize.',
  },
  'resize-observer': {
    title: 'Full width + ResizeObserver',
    subheader:
      'To adapt to every resize of the parent element, the component can use "ResizeObserver".\nNotice that IE and old-version browsers may not support ResizeObserver. In this case, consider using "window.onresize" instead.',
  },
};
