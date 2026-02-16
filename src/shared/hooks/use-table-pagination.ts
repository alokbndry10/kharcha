import type { TablePaginationConfig } from 'antd';
import type React from 'react';

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

export type PaginationFilterShape = {
  page: number;
  pageSize: number;
};

/**
 * Shared helper to keep AntD Table pagination controlled and synced with filter state.
 * Designed for server-side pagination (Supabase `.range(from, to)`).
 */
export function useTablePagination<TFilters extends PaginationFilterShape>(args: {
  total: number;
  page: number;
  pageSize: number;
  setFilters: Setter<TFilters>;
  options?: Pick<TablePaginationConfig, 'showSizeChanger' | 'hideOnSinglePage' | 'showTotal'>;
}) {
  const { total, page, pageSize, setFilters, options } = args;

  const pagination: TablePaginationConfig = {
    total,
    current: page,
    pageSize,
    showSizeChanger: options?.showSizeChanger ?? true,
    hideOnSinglePage: options?.hideOnSinglePage ?? false,
    showTotal: options?.showTotal,
  };

  const onTableChange = (pagination: TablePaginationConfig) => {
    setFilters((filters) => ({
      ...filters,
      page: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? filters.pageSize,
    }));
  };

  return { pagination, onTableChange };
}
