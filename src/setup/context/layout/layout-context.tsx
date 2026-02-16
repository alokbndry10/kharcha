import { Dispatch, MutableRefObject, ReactNode, SetStateAction, createContext, useContext } from 'react';
import { useSidebarContext } from './sidebar-context';
import { EndLayout, useEndLayoutRef } from './end-layout-context';

export type SubmenuOverlay = null | 'channels' | 'members' | 'teams';

export type LayoutType = {
  sidebarMobileDrawerOpen: boolean;
  sidebarCollapsed: boolean;
  openSidebarCollapse: VoidFunction;
  closeSidebarCollapse: VoidFunction;
  openSidebarMobileDrawer: VoidFunction;
  closeSidebarMobileDrawer: VoidFunction;
  toggleSidebarCollapse: VoidFunction;
  endLayoutRef: null | MutableRefObject<EndLayout>;
  isSubmenuOverlay: SubmenuOverlay;
  setIsSubmenuOverlay: Dispatch<SetStateAction<SubmenuOverlay>>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const layoutDefaultValues = {
  sidebarMobileDrawerOpen: false,
  sidebarCollapsed: false,
  openSidebarCollapse: () => {},
  closeSidebarCollapse: () => {},
  openSidebarMobileDrawer: () => {},
  closeSidebarMobileDrawer: () => {},
  toggleSidebarCollapse: () => {},
  endLayoutRef: null,
  isSubmenuOverlay: null,
  setIsSubmenuOverlay: () => {},
};

const LayoutContext = createContext<LayoutType>(layoutDefaultValues);

export function LayoutContextProvider({ children }: { children: ReactNode }) {
  const sidebarContexts = useSidebarContext();
  const endLayoutRef = useEndLayoutRef();

  return (
    <LayoutContext.Provider
      value={{
        ...sidebarContexts,
        endLayoutRef,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLayoutContext() {
  const context = useContext(LayoutContext);
  return context;
}
