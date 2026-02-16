import { useLayoutEffect, useState } from 'react';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
type ScreenSize = {
  screen: Size | null;
  isMobile: boolean;
  isSmallerDevice: boolean;
};

const breakpoints = {
  xs: 576,
  sm: 768,
  md: 992,
  xl: 1400,
  xxl: 1600,
  xxxl: 2000,
};

export function useScreenSize(): ScreenSize {
  const [screen, setScreen] = useState<Size | null>(null);

  function determineSize() {
    if (self.innerWidth <= breakpoints.xs) {
      setScreen('xs');
      return;
    }
    if (self.innerWidth <= breakpoints.sm) {
      setScreen('sm');
      return;
    }
    if (self.innerWidth <= breakpoints.md) {
      setScreen('md');
      return;
    }
    if (self.innerWidth <= breakpoints.xl) {
      setScreen('lg');
      return;
    }
    if (self.innerWidth <= breakpoints.xxl) {
      setScreen('xl');
      return;
    }

    if (self.innerWidth <= breakpoints.xxxl) {
      setScreen('xxl');
      return;
    }

    setScreen('xxxl');
  }

  useLayoutEffect(() => {
    determineSize();
  }, []);

  const isMobile = self.innerWidth <= breakpoints.sm;
  const isSmallerDevice = self.innerWidth < 1280;

  return {
    screen,
    isMobile,
    isSmallerDevice,
  };
}
