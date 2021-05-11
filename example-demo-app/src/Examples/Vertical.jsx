import React, { useState } from 'react';
import SlideRule from 'react-slide-rule';

const STYLES = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  title: { fontSize: '1rem', margin: 0 },
  value: { fontSize: '2rem', fontWeight: 700 },
};

export default React.memo(function () {
  const [value, setValue] = useState(1);

  return (
    <div style={STYLES.root}>
      <p style={STYLES.title}>Zoom</p>
      <p style={STYLES.value}>{value}x</p>
      <SlideRule
        direction="column"
        value={value}
        onChange={setValue}
        precision={0.05}
        unit="x"
        min={0.5}
        max={3}
      />
    </div>
  );
});
