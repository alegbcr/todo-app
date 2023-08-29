import { useEffect, useState } from 'react';

const useViewportSize = () => {
  const [widthSize, setWidthSize] = useState(window.innerWidth);

  /* This function called handleResize that updates the widthSize state variable
  with the current inner width of the window. */
  useEffect(() => {
    const handleResize = () => {
      setWidthSize(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return widthSize;
};

export { useViewportSize };
