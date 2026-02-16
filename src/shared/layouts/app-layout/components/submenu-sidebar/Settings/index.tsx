import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SettingsMenu() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Menu
      selectedKeys={[selectedKeys(pathname)]}
      onClick={(e) => navigate(e.key)}
      mode="inline"
      items={[]}
      className="sidebar-submenu"
    />
  );
}

function selectedKeys(pathname: string) {
  if (pathname.includes('team-management')) {
    return '/settings/team-management';
  }
  if (pathname.includes('purchase-number')) {
    return '/settings/my-numbers';
  }
  if (pathname.includes('integrations')) {
    return '/settings/integrations';
  }
  return pathname;
}
