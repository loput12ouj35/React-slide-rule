import { useEffect, useRef, useState } from 'react';
import SlideRule from 'react-slide-rule';

export default function () {
  const [value, setValue] = useState(150);
  const root = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(300);

  useEffect(() => {
    if (!window.ResizeObserver) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width)
    );
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  return window.ResizeObserver ? (
    <div ref={root} className="example-basic example-resize-observer">
      <SlideRule value={value} onChange={setValue} width={width} />
    </div>
  ) : (
    <p>This browser dose not support ResizeObserver!</p>
  );
}
