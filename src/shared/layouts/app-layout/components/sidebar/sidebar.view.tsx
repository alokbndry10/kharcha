import { Divider, Drawer, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { items } from './items';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarHeader } from './components/sidebar-header';
import { sidebar_width } from '@shared/constants/app.constants';
import { useScreenSize } from '@shared/hooks/use-screen';
import { useMemo } from 'react';
import clsx from 'clsx';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SidebarView(props: any) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { layoutContext } = props;
  const { sidebarCollapsed, closeSidebarMobileDrawer, sidebarMobileDrawerOpen } = layoutContext;
  const { isSmallerDevice } = useScreenSize();

  const activeKey = useMemo(() => {
    return selectedKeys(pathname, items);
  }, [pathname]);

  const SidebarComponent = (sidebarCollapsed: boolean) => {
    return (
      <Sider
        theme="light"
        width={sidebar_width}
        trigger={null}
        collapsible
        collapsed={sidebarCollapsed}
        className="border-r border-gray-500 overflow-y-auto overflow-x-hidden sticky h-dvh"
      >
        <SidebarHeader collapsed={sidebarCollapsed} />
        <span className="sidebar">
          <Menu
            selectedKeys={activeKey ? [activeKey] : ['']}
            onClick={(e) => {
              closeSidebarMobileDrawer();
              navigate(e.key);
            }}
            mode="inline"
            inlineCollapsed={sidebarCollapsed}
            items={items}
            className={clsx(sidebarCollapsed && '[&_.ant-menu-item]:pl-6.5!')}
          />
        </span>
        <Divider rootClassName="!my-2 border-gray-500!" />
      </Sider>
    );
  };

  return (
    <>
      {isSmallerDevice && (
        <Drawer
          closable
          onClose={closeSidebarMobileDrawer}
          placement="left"
          width={sidebar_width}
          open={sidebarMobileDrawerOpen}
          styles={{
            body: {
              padding: 0,
              overflow: 'hidden',
            },
          }}
          className="xl:hidden sidebar-drawer"
        >
          {SidebarComponent(false)}
        </Drawer>
      )}
      <div className="hidden md:block">{SidebarComponent(sidebarCollapsed)}</div>
    </>
  );
}

// always active parent despite sub navigations
function selectedKeys(pathname: string, items: MenuProps['items']) {
  const matchItem = items?.find((item) => {
    const path = String(item?.key)?.split('/')?.[1]; // this give path like dashboard, settings, analytics without slash because of split
    return pathname.startsWith('/' + path);
  });
  return matchItem?.key?.toString();
}
