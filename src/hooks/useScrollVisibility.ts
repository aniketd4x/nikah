import { useState, useEffect, useRef } from 'react';

interface ScrollVisibilityOptions {
  threshold?: number;
  topOffset?: number;
}

export const useScrollVisibility = (options?: ScrollVisibilityOptions) => {
  const { threshold = 10, topOffset = 30 } = options || {};
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastScrollY.current = typeof window !== 'undefined' ? window.scrollY : 0;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;

      // Always show when near top of the page
      if (scrollY <= topOffset) {
        setIsVisible(true);
        lastScrollY.current = scrollY > 0 ? scrollY : 0;
        ticking.current = false;
        return;
      }

      // Check if scroll delta exceeds threshold
      const diff = scrollY - lastScrollY.current;
      if (Math.abs(diff) >= threshold) {
        if (diff > 0) {
          // Scrolling down -> hide menu
          setIsVisible(false);
        } else {
          // Scrolling up -> show menu
          setIsVisible(true);
        }
        lastScrollY.current = scrollY;
      }

      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollDir);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold, topOffset]);

  return isVisible;
};
