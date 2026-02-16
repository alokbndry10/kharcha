import Sider from 'antd/es/layout/Sider';
import { ReactNode, Suspense, lazy, useState } from 'react';
import { SubMenuRoute } from '../../app-bread-crumb.types';
import clsx from 'clsx';
import { sidebar_width } from '@shared/constants/app.constants';
import { SubmenuOverlay } from '@/setup/context/layout/layout-context';
import { RiChatNewLine, RiSidebarFoldLine } from 'react-icons/ri';
import { Tooltip } from 'antd';
const SettingsMenu = lazy(() => import('./Settings'));

type Props = {
  isMobile: boolean;
  openSidebarMobileDrawer: VoidFunction;
  fullWidth: boolean | SubMenuRoute;
  rootPathname: SubMenuRoute | Exclude<SubmenuOverlay, null>;
  channelName: string | undefined;
};

export default function SubMenuSidebar(props: Props) {
  const { isMobile, openSidebarMobileDrawer, fullWidth, rootPathname, channelName } = props;
  const [_, setOpenNewConvoModal] = useState(false);

  // TODO
  const sidebarOpener = (
    <span className={clsx(isMobile ? '' : 'hidden')}>
      <RiSidebarFoldLine onClick={openSidebarMobileDrawer} className="cursor-pointer size-5 text-text-900" />
    </span>
  );
  return (
    <>
      <Sider
        width={fullWidth ? '100%' : sidebar_width}
        trigger={null}
        theme="light"
        className="border-r border-gray-300 overflow-hidden sticky h-dvh sub-menu"
      >
        <div className="px-4 h-16 border-y border-y-gray-300 justify-between items-center flex">
          <section className="flex gap-2 items-center flex-1">
            {sidebarOpener}
            {rootPathname === 'conversations' ? (
              <div className="flex flex-1 justify-between items-center">
                <p>{channelName}</p>
                <Tooltip title="New Message">
                  <RiChatNewLine size={22} className="cursor-pointer" onClick={() => setOpenNewConvoModal(true)} />
                </Tooltip>
              </div>
            ) : (
              renderConditionalSubMenu(rootPathname).header
            )}
          </section>
        </div>
        <div className="bg-gray-200 overflow-auto h-[calc(100%-60px)]">
          <div className="h-full">{renderConditionalSubMenu(rootPathname).content}</div>
        </div>
      </Sider>
    </>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function renderConditionalSubMenu(rootPathname: Props['rootPathname']): {
  header: ReactNode;
  content: ReactNode;
} {
  switch (rootPathname) {
    case 'settings':
      return {
        header: 'Settings',
        content: (
          <Suspense>
            <SettingsMenu />
          </Suspense>
        ),
      };

    default:
      return {
        header: null,
        content: null,
      };
  }
}
