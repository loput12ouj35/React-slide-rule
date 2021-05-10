import React, { useCallback, useEffect, useRef, useState } from 'react';
import SlideRule from '../SlideRule';

export default React.memo(function () {
  const [value, setValue] = useState(150);
  const root = useRef();
  const [width, setWidth] = useState(300);
  const adjustWidth = useCallback(() => setWidth(root.current.offsetWidth), []);

  useEffect(() => {
    if (!window.ResizeObserver) return null;
    const observer = new ResizeObserver(adjustWidth);
    observer.observe(root.current);
    return () => observer.unobserve();
  }, []);

  return window.ResizeObserver ? (
    <div ref={root}>
      <SlideRule value={value} onChange={setValue} width={width} />
    </div>
  ) : (
    <p>This browser dose not support ResizeObserver!</p>
  );
});
