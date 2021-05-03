import SlideRule from 'SlideRule';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export default React.memo(function App() {
  const [value, setValue] = useState(150);

  return (
    <>
      <Width100PercentExample />
      <ResizeObserverExample />
      <SlideRule value={value} onChange={setValue} gap={5} />
      <SlideRule value={value} onChange={setValue} gap={20} />
      <SlideRule value={value} onChange={setValue} precision={2} />
      <SlideRule gap={20} precision={0.01} />
    </>
  );
});

const Width100PercentExample = React.memo(function () {
  const [value, setValue] = useState(150);
  const [ref, setRef] = useState(null);
  const width = ref?.offsetWidth;

  return (
    <div ref={(node) => setRef(node)}>
      <SlideRule value={value} onChange={setValue} width={width} />
    </div>
  );
});

const ResizeObserverExample = React.memo(function () {
  const [value, setValue] = useState(150);
  const root = useRef();
  const [width, setWidth] = useState(300);
  const adjustWidth = useCallback(() => setWidth(root.current.offsetWidth), []);

  useEffect(() => {
    const observer = new ResizeObserver(adjustWidth);
    observer.observe(root.current);
    return () => observer.unobserve();
  }, []);

  return (
    <div ref={root}>
      <SlideRule value={value} onChange={setValue} width={width} />
    </div>
  );
});
