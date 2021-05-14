import React from 'react';

const prefixPath =
  'https://github.com/loput12ouj35/React-slide-rule/blob/main/example-demo-app/src/Examples/';
const isAlwaysEqual = () => true;

export default React.memo(function ExampleItem(props) {
  const { id, title, subheader, fileName, example } = props;

  return (
    <li>
      {title && <h3 id={id}>{title}</h3>}
      <p>{subheader}</p>
      {example}
    </li>
  );
}, isAlwaysEqual);
