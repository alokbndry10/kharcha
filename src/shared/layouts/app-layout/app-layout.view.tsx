import { useLayoutContext } from '@/setup/context/layout/layout-context';
import { useScreenSize } from '@shared/hooks/use-screen';
import { Layout, Spin } from 'antd';
import { lazy, LegacyRef, ReactNode, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from './app-bread-crumb.types';
import { AppBreadcrumbs } from './components/app-bread-crumbs';
import AppHeader from './components/header/header.view';
import { Sidebar } from './components/sidebar/sidebar';
import { SubmenuOverlayPage } from './components/submenu-overlay/submenu-overlay.page';
import { subMenuRoutes } from './constants';
const SubMenuSidebarPage = lazy(() => import('./components/submenu-sidebar/submenu-sidebar.page'));

interface Props {
  children: ReactNode;
  breadcrumbs?: Breadcrumb[];
}
export function AppLayout({ children, breadcrumbs }: Props) {
  const { pathname } = useLocation();
  const { isMobile } = useScreenSize();
  const { endLayoutRef } = useLayoutContext();

  const isExactSubmenuPath = subMenuRoutes.find((menu) => '/' + menu === pathname);
  const isConversationMenu = pathname.includes('/conversations') && pathname.split('/').length === 3;

  const mobileLayout =
    isExactSubmenuPath || isConversationMenu ? (
      <Suspense
        fallback={
          <div className="h-dvh flex items-center justify-center">
            <Spin spinning />
          </div>
        }
      >
        <SubMenuSidebarPage />
      </Suspense>
    ) : (
      <Layout className="flex-row! gap-0!">
        <div className="flex-1 flex flex-col h-dvh w-full">
          <AppHeader />
          <AppBreadcrumbs breadcrumbs={breadcrumbs ?? null} />
          <div className="flex-1 overflow-auto flex flex-col space-y-2">{children}</div>
        </div>
        <div className="z-100 h-dvh absolute right-0 top-0" ref={endLayoutRef as LegacyRef<HTMLDivElement>} />
      </Layout>
    );

  return (
    <Layout hasSider className="max-w-full overflow-x-hidden">
      <Sidebar />
      <SubmenuOverlayPage />

      {isMobile ? (
        mobileLayout
      ) : (
        <Suspense
          fallback={
            <div className="h-dvh flex items-center justify-center">
              <Spin spinning />
            </div>
          }
        >
          <SubMenuSidebarPage />
          <Layout className="h-screen overflow-hidden">
            <AppHeader />
            <div className="flex flex-1 overflow-hidden">
              <div className="flex flex-col flex-1 overflow-hidden">
                <AppBreadcrumbs breadcrumbs={breadcrumbs ?? null} />
                <div className="flex-1 overflow-auto flex flex-col gap-2">{children}</div>
              </div>
              <div ref={endLayoutRef as LegacyRef<HTMLDivElement>} />
            </div>
          </Layout>
        </Suspense>
      )}
    </Layout>
  );
}
