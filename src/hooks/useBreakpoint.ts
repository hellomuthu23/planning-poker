import { useEffect, useState } from 'react';

const breakpoints = {
  sm: 640, // Tailwind's `sm` breakpoint
  md: 768, // Tailwind's `md` breakpoint
  lg: 1024, // Tailwind's `lg` breakpoint
  xl: 1280, // Tailwind's `xl` breakpoint
  '2xl': 1536, // Tailwind's `2xl` breakpoint
};

export const useBreakpoint = () => {
  const [screenSize, setScreenSize] = useState<string | null>(null);

  useEffect(() => {
    const getBreakpoint = () => {
      const width = window.visualViewport?.width || window.innerWidth;

      if (width >= breakpoints['2xl']) return '2xl';
      if (width >= breakpoints.xl) return 'xl';
      if (width >= breakpoints.lg) return 'lg';
      if (width >= breakpoints.md) return 'md';
      if (width >= breakpoints.sm) return 'sm';
      return 'xs'; // Default for screens smaller than `sm`
    };

    const handleResize = () => {
      setScreenSize(getBreakpoint());
    };

    // Set initial screen size
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};
