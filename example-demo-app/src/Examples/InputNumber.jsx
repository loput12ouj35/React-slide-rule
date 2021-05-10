import React, { useCallback, useState } from 'react';
import SlideRule from '../SlideRule';

const [min, max, precision] = [100, 300, 1];
const STYLES = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  arrow: {
    backgroundColor: 'black',
    width: '0.5rem',
    height: '0.5rem',
    position: 'absolute',
    top: '1.8rem',
    transform: 'rotate(45deg)',
  },
  input: {
    zIndex: 1,
    width: '4rem',
    height: '2rem',
    backgroundColor: 'black',
    borderRadius: '0.25rem',
    color: 'white',
    textAlign: 'center',
    border: 0,
    outline: 0,
    font: 'inherit',
    marginBottom: '0.5em',
    boxShadow: 'rgba(0,0,0,0.12) 0px 4px 20px 0px, rgba',
  },
};

export default React.memo(function () {
  const [value, setValue] = useState(150);
  const handleChange = useCallback((e) => setValue(Number(e.target.value)), []);
  const handleBlur = useCallback(
    (e) => setValue(Math.max(min, Math.min(e.target.value, max))),
    []
  );

  return (
    <div style={STYLES.root}>
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
      />
    </div>
  );
});
