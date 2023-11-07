import { useState } from 'react';
import SlideRule from '../../../src'; //TODO: just for test after merging we change the source of import to 'react-slide-rule'

export default function MultiplePointers() {
  const [value, setValue] = useState(150);

  return (
    <div className="example-basic">
      <SlideRule
        value={value}
        onChange={setValue}
        pointers={[
          { value: 163, styles: { color: 'red' } },
          { value: 154, styles: { color: 'orange' } },
          { value: 142, styles: { color: 'green' } },
        ]}
      />
    </div>
  );
}
