import { useState } from 'react';
import SlideRule from 'react-slide-rule';

export default function Basic() {
  const [value, setValue] = useState(150);

  return (
    <div className="example-basic">
      <p>{value}</p>
      <SlideRule value={value} onChange={setValue} />
    </div>
  );
};