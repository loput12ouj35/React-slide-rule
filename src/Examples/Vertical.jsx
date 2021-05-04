import React, { useState } from 'react';
import { SlideRule } from 'SlideRule';

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
      <SlideRule
        width={75}
        height={300}
        value={value}
        onChange={setValue}
        primaryStyle={{
          color: '#C4C4C4',
          width: 30,
          height: 3,
          top: 0,
          left: 0,
        }}
        secondaryStyle={{
          color: '#E4E4E4',
          width: 15,
          height: 2,
          top: 0,
          left: 0,
        }}
        textStyle={{
          size: '1.25em',
          family: 'Arial',
          color: 'rgba(0, 0, 0, 0.87)',
          top: 35,
          left: 35,
          textAlign: 'left',
          textBaseline: 'middle',
        }}
        centerComponent={
          <div style={{ width: 35, height: 3, backgroundColor: 'red' }} />
        }
        direction="column"
      />
    </div>
  );
});
