import React, { useState } from 'react';
import SlideRule from 'react-slide-rule';

export default React.memo(function () {
  const [value, setValue] = useState(150);

  return (
    <div className="example-basic example-custom-cursor">
      <SlideRule
        value={value}
        onChange={setValue}
        width={500}
        markStyle={{ top: 24 }}
        smallerMarkStyle={{ top: 39 }}
        numberStyle={{ top: 0 }}
        cursor={<CustomCursor />}
      />
    </div>
  );
});

const CustomCursor = React.memo(function () {
  return <div className="custom-cursor" />;
});
