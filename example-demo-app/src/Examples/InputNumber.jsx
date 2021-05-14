import React, { useCallback, useState } from 'react';
import SlideRule from 'react-slide-rule';

const [min, max, step] = [0, 300, 0.1];

export default React.memo(function () {
  const [value, setValue] = useState(70.3);
  const handleChange = useCallback((e) => setValue(Number(e.target.value)), []);
  const handleBlur = useCallback(
    (e) => setValue(Math.max(min, Math.min(e.target.value, max))),
    []
  );

  return (
    <div className="example-basic example-input-element">
      <p>Weight (kg)</p>
      <div className="arrow" />
      <input
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        step={step}
        min={min}
        max={max}
        type="number"
      />
      <SlideRule
        value={value}
        onChange={setValue}
        min={min}
        max={max}
        step={step}
        width={500}
      />
    </div>
  );
});
