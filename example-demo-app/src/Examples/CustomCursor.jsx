import React, { useState } from 'react';
import SlideRule from 'react-slide-rule';

const STYLES = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cursor: {
    backgroundColor: 'crimson',
    width: '0.75rem',
    height: '0.75rem',
    transform: 'rotate(45deg)',
    marginTop: '3rem',
  },
};

export default React.memo(function () {
  const [value, setValue] = useState(150);

  return (
    <div style={STYLES.root}>
      <SlideRule
        value={value}
        onChange={setValue}
        width={500}
        majorStyle={{ top: 24 }}
        minorStyle={{ top: 39 }}
        textStyle={{ top: 0 }}
        cursor={<CustomCursor />}
      />
    </div>
  );
});

const CustomCursor = React.memo(function () {
  return <div style={STYLES.cursor} />;
});
