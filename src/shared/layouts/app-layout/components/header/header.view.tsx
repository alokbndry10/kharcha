import clsx from 'clsx';
import { memo } from 'react';
import { Header } from 'antd/es/layout/layout';
import { useLayoutContext } from '@/setup/context/layout/layout-context';
import { IoMenu } from 'react-icons/io5';
import { useScreenSize } from '@shared/hooks/use-screen';
import { ProfileDropdown } from '@components/profile-dropdown/components/profile-dropdown-container';

function AppHeader() {
  const { isSmallerDevice } = useScreenSize();
  const { sidebarCollapsed, openSidebarMobileDrawer, toggleSidebarCollapse } = useLayoutContext();

  return (
    <Header className="bg-white! border-y border-gray-300 px-4! sticky top-0 w-full flex items-center justify-between z-50">
      <div className="flex items-center gap-2">
        <span className={clsx(sidebarCollapsed && 'rotate-y-180', 'transition-all duration-500 text-primary-400')}>
          <IoMenu
            onClick={isSmallerDevice ? openSidebarMobileDrawer : toggleSidebarCollapse}
            className="cursor-pointer size-7"
          />
        </span>
      </div>
      <div className="flex gap-3 items-center">
        <ProfileDropdown />
      </div>
    </Header>
  );
}

export default memo(AppHeader);
