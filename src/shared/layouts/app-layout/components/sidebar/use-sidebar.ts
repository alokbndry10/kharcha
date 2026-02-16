import { useLayoutContext } from '@/setup/context/layout/layout-context';

export function useSidebarHooks() {
  const layoutContext = useLayoutContext();

  return {
    layoutContext,
  };
}
