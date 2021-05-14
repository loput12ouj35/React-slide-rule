import React, { useState } from 'react';
import SlideRule from 'react-slide-rule';

export default React.memo(function () {
  const [value, setValue] = useState(1.5);

  return (
    <div className="example-basic example-vertical">
      <SlideRule
        axis="y"
        value={value}
        onChange={setValue}
        step={0.05}
        unit="x"
        min={0.5}
        max={3}
      />
      <div className="box">
        <p>Zoom</p>
        <p>{value}x</p>
      </div>
      <SlideRule
        axis="y-reverse"
        value={value}
        onChange={setValue}
        step={0.05}
        unit="x"
        min={0.5}
        max={3}
      />
    </div>
  );
});
