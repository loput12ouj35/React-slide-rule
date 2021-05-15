import descriptions from 'Data/descriptions';
import exampleMap from 'Data/exampleMap';
import React from 'react';

export default React.memo(function ExampleItem({ id }) {
  const { title, subheader } = descriptions[id];
  const { fileName, example } = exampleMap[id];

  return (
    <li>
      {title && <h3 id={id}>{title}</h3>}
      <p>{subheader}</p>
      {example}
      <a href={fileName}>&#x1F517; View code</a>
    </li>
  );
});
