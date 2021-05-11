import React, { useState } from 'react';
import SlideRule from 'react-slide-rule';

const STYLE = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export default React.memo(function () {
  const [value, setValue] = useState(150);

  return (
    <div style={STYLE}>
      <p>{value}</p>
      <SlideRule value={value} onChange={setValue} />
    </div>
  );
});
