import SliderRuler from 'SliderRuler';
import React, { useEffect, useRef, useState } from 'react';

export default React.memo(function App() {
  const root = useRef();
  const test = useRef();
  const [value, setValue] = useState(150);

  useEffect(() => {
    const observer = new ResizeObserver(test.current.adjustSize);
    observer.observe(root.current);
    return () => observer.unobserve();
  }, []);

  return (
    <div ref={root}>
      <SliderRuler ref={test} value={value} onChange={setValue} />
      <SliderRuler ref={test} value={value} onChange={setValue} divide={5} />
      <SliderRuler ref={test} value={value} onChange={setValue} divide={20} />
      <SliderRuler ref={test} value={value} onChange={setValue} precision={2} />
      <SliderRuler divide={20} precision={0.01} />
    </div>
  );
});
