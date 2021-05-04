import React, { useCallback, useState } from 'react';
import { SlideRule } from 'SlideRule';

export default React.memo(function () {
  const [options, setOptions] = useState({});
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setOptions((v) => ({ ...v, [name]: value }));
  });

  return <SlideRule />;
});
