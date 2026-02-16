import { useSidebarHooks } from './use-sidebar';
import { SidebarView } from './sidebar.view';

export function Sidebar() {
  const sidebarLogics = useSidebarHooks();
  return <SidebarView {...sidebarLogics} />;
}
