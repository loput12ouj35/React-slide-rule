import { useState } from 'react';
import SlideRule from 'react-slide-rule';

export default function CustomCursor() {
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
        cursor={<div className="custom-cursor" />}
      />
    </div>
  );
}
