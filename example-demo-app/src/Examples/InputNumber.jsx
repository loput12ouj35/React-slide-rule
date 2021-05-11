import React, { useCallback, useState } from 'react';
import SlideRule from 'react-slide-rule';

const [min, max, precision] = [0, 300, 0.1];
const STYLES = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  arrow: {
    backgroundColor: 'black',
    width: '0.75rem',
    height: '0.75rem',
    position: 'absolute',
    top: '6rem',
    transform: 'rotate(45deg)',
  },
  title: { fontSize: '1rem', color: '#999' },
  input: {
    zIndex: 1,
    width: '7rem',
    height: '3rem',
    backgroundColor: 'black',
    borderRadius: '0.25rem',
    color: 'white',
    textAlign: 'center',
    border: 0,
    outline: 0,
    fontSize: '2rem',
    marginBottom: '0.5rem',
    boxShadow: 'rgba(0,0,0,0.12) 0px 4px 20px 0px, rgba',
  },
};

export default React.memo(function () {
  const [value, setValue] = useState(70.3);
  const handleChange = useCallback((e) => setValue(Number(e.target.value)), []);
  const handleBlur = useCallback(
    (e) => setValue(Math.max(min, Math.min(e.target.value, max))),
    []
  );

  return (
    <div style={STYLES.root}>
      <p style={STYLES.title}>Weight (kg)</p>
      <div style={STYLES.arrow} />
      <input
        style={STYLES.input}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        step={precision}
        min={min}
        max={max}
        type="number"
      />
      <SlideRule
        value={value}
        onChange={setValue}
        min={min}
        max={max}
        precision={precision}
        width={500}
      />
    </div>
  );
});
