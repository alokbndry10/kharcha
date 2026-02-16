import { ColumnType } from 'antd/es/table';

export type DataTableProps<T> = {
  loading: boolean;
  tableColumns: ColumnType<T>[];
  tableDataSource: T[];
  onChange: (page: number, pageSize: number) => void;
  total: number;
  onRowChange?: (record: T) => { onClick: () => void };
  currentParams: string | null;
  hoverable?: boolean;
  extendedClassName?: string;
};
