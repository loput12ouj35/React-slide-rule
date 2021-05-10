import React, { useState } from 'react';
import SlideRule from 'react-slide-rule';

const STYLES = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  p: { textAlign: 'center' },
};

export default React.memo(function () {
  const [value, setValue] = useState(150);

  return (
    <div style={STYLES.root}>
      <p style={STYLES.p}>{value}</p>
      <SlideRule value={value} onChange={setValue} />
    </div>
  );
});
