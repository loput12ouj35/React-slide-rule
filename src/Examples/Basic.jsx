import React, { useState } from 'react';
import { SlideRule } from 'SlideRule';

export default React.memo(function () {
  const [value, setValue] = useState(150);

  return (
    <div>
      <p style={{ textAlign: 'center' }}>{value}</p>
      <SlideRule value={value} onChange={setValue} />
    </div>
  );
});
