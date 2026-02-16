import { useEffect, useState } from 'react';
import { SubmenuOverlay } from './layout-context';
import { useLocation } from 'react-router-dom';
import { useScreenSize } from '@shared/hooks/use-screen';

export function useSidebarContext() {
  const { pathname } = useLocation();
  const { isSmallerDevice } = useScreenSize();
  const [sidebar, setSidebar] = useState({
    mobileDrawer: false,
    collapsed: isSmallerDevice,
  });
  const [isSubmenuOverlay, setIsSubmenuOverlay] = useState<SubmenuOverlay>(null);

  function openSidebarMobileDrawer() {
    setSidebar({
      ...sidebar,
      mobileDrawer: true,
    });
  }
  function closeSidebarMobileDrawer() {
    setSidebar({
      ...sidebar,
      mobileDrawer: false,
    });
  }
  function openSidebarCollapse() {
    setSidebar({
      ...sidebar,
      collapsed: true,
    });
  }
  function closeSidebarCollapse() {
    setSidebar({
      ...sidebar,
      collapsed: false,
    });
  }
  function toggleSidebarCollapse() {
    setSidebar({
      ...sidebar,
      collapsed: !sidebar.collapsed,
    });
  }

  useEffect(() => {
    setIsSubmenuOverlay(null);
  }, [pathname]);

  return {
    sidebarMobileDrawerOpen: sidebar.mobileDrawer,
    sidebarCollapsed: sidebar.collapsed,
    openSidebarCollapse,
    closeSidebarCollapse,
    toggleSidebarCollapse,
    openSidebarMobileDrawer,
    closeSidebarMobileDrawer,
    isSubmenuOverlay,
    setIsSubmenuOverlay,
  };
}
