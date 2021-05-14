import React, { useState } from 'react';
import SlideRule from 'react-slide-rule';

export default React.memo(function () {
  const [value, setValue] = useState(150);

  return (
    <div className="example-basic example-custom-styled">
      <SlideRule
        value={value}
        onChange={setValue}
        width={500}
        markStyle={{ color: 'yellow' }}
        smallerMarkStyle={{ top: 7 }}
        numberStyle={{ color: 'white' }}
        gap={20}
      />
      <p>The current value is {value}</p>
    </div>
  );
});
