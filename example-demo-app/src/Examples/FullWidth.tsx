import { useState } from 'react';
import SlideRule from 'react-slide-rule';

export default function FullWidth() {
  const [value, setValue] = useState(150);

  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const width = ref?.offsetWidth;

  function handleValueOnChange(value: number) {
    setValue(value);
  }

  return (
    <div ref={setRef} className="example-basic">
      <SlideRule value={value} onChange={handleValueOnChange} width={width} />
    </div>
  );
}
