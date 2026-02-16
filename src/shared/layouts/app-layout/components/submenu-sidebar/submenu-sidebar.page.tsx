import { useLocation } from 'react-router-dom';
import { getRootPath, subMenuRoutes } from '../../constants';
import { SubMenuRoute } from '../../app-bread-crumb.types';
import { Suspense, lazy } from 'react';
import { useScreenSize } from '@shared/hooks/use-screen';
import { useEncryptedParams } from '@shared/hooks/use-encrypted-params';
import { useLayoutContext } from '@/setup/context/layout/layout-context';
import { Spin } from 'antd';
const SubMenuSidebar = lazy(() => import('./submenu-sidebar.view'));

export default function SubMenuSidebarPage() {
  const { pathname } = useLocation() as unknown as { pathname: SubMenuRoute };
  const rootPathname = getRootPath(pathname) as SubMenuRoute;
  const { isMobile } = useScreenSize();
  const [params] = useEncryptedParams();
  const channelName = params.get('channelName');

  const { openSidebarMobileDrawer } = useLayoutContext();
  const isExactSubmenuPath = subMenuRoutes.find((menu) => '/' + menu === pathname);
  const isConversationMenu = pathname.includes('/conversations') && pathname.split('/').length === 3;
  const isMemberConversation = pathname.includes('/conversations/member');
  const fullWidth = isMobile && (isExactSubmenuPath || isConversationMenu);

  if (subMenuRoutes.includes(rootPathname) && !isMemberConversation) {
    return (
      <Suspense
        fallback={
          <div className="h-dvh flex items-center justify-center">
            <Spin spinning />
          </div>
        }
      >
        <SubMenuSidebar
          channelName={channelName}
          rootPathname={rootPathname}
          fullWidth={fullWidth}
          openSidebarMobileDrawer={openSidebarMobileDrawer}
          isMobile={isMobile}
        />
      </Suspense>
    );
  }
}
