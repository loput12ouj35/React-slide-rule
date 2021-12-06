export default {
  main: ' allows users to select a value along a subjectvie range and step.\nThis application lists demos of the component.',
  basic: {
    subheader:
      "Let's get started with a simple example provided with a value and callback to update the value.",
  },
  'input-element': {
    title: 'Slide rule & <input> element',
    subheader:
      'In this example, the component and the input element share state.',
  },
  vertical: {
    title: 'Vertical slide rules & unit',
    subheader:
      'You can use vertical slide rules by setting the "axis" prop to "y" or "y-reverse".\nThe text of the "unit" prop is attached to each number.',
  },
  'custom-styled': {
    title: 'Custom styled mark & number',
    subheader:
      'You can customize the styles of marks and numbers, and change the gap between each mark.',
  },
  'rotate-number': {
    title: 'Rotate number',
    subheader: 'You can customize the slope of numbers',
  },
  'custom-cursor': {
    title: 'Custom cursor & positioning',
    subheader:
      'You can use any React element as a cursor, set the position of marks, and place numbers above the marks.',
  },
  'full-width': {
    title: 'Full width',
    subheader:
      'In this example, the component stretchs to the parent width.\nNotice that the component is not responsive and will never resize.',
  },
  'resize-observer': {
    title: 'Responsive Slide Rule',
    subheader:
      'In this example, the component adapts to every resize of the parent element, by using "ResizeObserver".\nNotice that IE and old-version browsers may not support ResizeObserver. In this case, consider using "onresize" instead.',
  },
};
