import { SubmenuOverlay, useLayoutContext } from '@/setup/context/layout/layout-context';
import { ScrollableDiv } from '@components/scrollable-div';
import { useScreenSize } from '@shared/hooks/use-screen';
import clsx from 'clsx';
import SubMenuSidebar from '../submenu-sidebar/submenu-sidebar.view';
import { useOnClickOutside } from '@shared/hooks/use-on-click-outside';
import { useRef } from 'react';

export function SubmenuOverlayPage() {
  const { isSubmenuOverlay, setIsSubmenuOverlay, sidebarCollapsed } = useLayoutContext();
  const { isMobile } = useScreenSize();
  const overlayRef = useRef(null);
  useOnClickOutside(overlayRef, () => setIsSubmenuOverlay(null));

  return (
    <ScrollableDiv
      className={clsx(
        'absolute top-0 z-10 bg-white overflow-x-hidden shadow-lg shadow-primary-200',
        'transition-all duration-300 z-50',
        isSubmenuOverlay ? `w-[290px] opacity-100` : 'w-0 opacity-0',
        sidebarCollapsed ? 'left-[80px]' : isMobile ? '' : `left-[290px]`
      )}
    >
      {isSubmenuOverlay ? (
        <div ref={overlayRef}>
          <SubMenuSidebar
            openSidebarMobileDrawer={() => {}}
            isMobile={false}
            fullWidth={false}
            rootPathname={isSubmenuOverlay as Exclude<SubmenuOverlay, null>}
            channelName="conversations"
          />
        </div>
      ) : null}
    </ScrollableDiv>
  );
}
