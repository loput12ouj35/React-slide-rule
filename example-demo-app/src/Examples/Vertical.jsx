import React, { useState } from 'react';
import SlideRule from 'react-slide-rule';

const STYLES = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: { width: '15rem' },
  title: { fontSize: '1rem', margin: 0, color: '#999' },
  value: { fontSize: '2rem', fontWeight: 700 },
};

export default React.memo(function () {
  const [value, setValue] = useState(1);

  return (
    <div style={STYLES.root}>
      <div style={STYLES.box}>
        <p style={STYLES.title}>Zoom</p>
        <p style={STYLES.value}>{value}x</p>
      </div>
      <SlideRule
        axis="y"
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
