import React, { useState } from 'react';
import SlideRule from 'react-slide-rule';

const STYLES = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 2,
  },
  p: { color: 'wheat' },
};

export default React.memo(function () {
  const [value, setValue] = useState(150);

  return (
    <div style={STYLES.root}>
      <SlideRule
        value={value}
        onChange={setValue}
        width={500}
        majorStyle={{ color: 'yellow' }}
        minorStyle={{ top: 7 }}
        textStyle={{ color: 'white' }}
        gap={20}
      />
      <p style={STYLES.p}>The current value is {value}</p>
    </div>
  );
});
