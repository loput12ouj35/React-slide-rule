import React, { useState } from 'react';
import SlideRule from 'react-slide-rule';

export default React.memo(function () {
  const [value, setValue] = useState(150);

  return (
    <div className="example-basic">
      <p>{value}</p>
      <SlideRule value={value} onChange={setValue} />
    </div>
  );
});
