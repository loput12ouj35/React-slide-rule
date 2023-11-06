import { useState } from 'react';
import SlideRule from 'react-slide-rule';

export default function RotateNumber() {
  const [value, setValue] = useState(150);

  return (
    <div className="example-basic example-rotate-number">
      <SlideRule
        value={value}
        onChange={setValue}
        // numberStyle={{ rotate: 200 }} //TODO: rotate type does not exist on numberStyle object type.
      />
    </div>
  );
}
