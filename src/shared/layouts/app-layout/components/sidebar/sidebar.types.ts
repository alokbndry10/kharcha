import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import { SetStateAction } from 'react';
import { LayoutType } from 'recharts/types/util/types';

export type SidebarViewProps = {
  layoutContext: LayoutType;
};

export type SearchWorkspaceProps = {
  filter: { query: string; limit: number };
  setFilter: (
    value: SetStateAction<{
      query: string;
      limit: number;
    }>
  ) => void;
};

export type SidebarItemType = ItemType<MenuItemType> & {
  mobileKey?: string;
};
