import { Table, Pagination } from 'antd';
import { DataTableProps } from './data-table.types';
import clsx from 'clsx';

export function AppTable<T extends object | null>({
  loading,
  tableColumns,
  tableDataSource = [],
  onChange,
  total,
  currentParams,
  onRowChange,
  hoverable = false,
  extendedClassName = '',
}: DataTableProps<T>) {
  return (
    <>
      <Table
        loading={loading}
        className={clsx(tableDataSource.length && hoverable ? 'hoverable' : '', extendedClassName)}
        bordered
        columns={tableColumns}
        scroll={{ x: 'max-content' }}
        onRow={onRowChange}
        pagination={false}
        dataSource={tableDataSource}
        sticky
      />
      <div className="flex justify-end pt-4 pb-4">
        <Pagination
          align="end"
          onChange={onChange}
          current={Number(currentParams)}
          total={total}
          showSizeChanger={false}
          hideOnSinglePage={true}
        />
      </div>
    </>
  );
}
