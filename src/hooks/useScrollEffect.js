import { useState, useEffect } from 'react';

export const useScrollEffect = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolling(true);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return { scrollY, isScrolling };
};