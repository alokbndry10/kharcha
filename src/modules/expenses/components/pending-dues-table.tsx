import { Table, Tag } from 'antd';
import { PendingDueExpense } from '@apis/expenses/use-pending-dues.query';
import { currency, show_date_format } from '@shared/constants/app.constants';
import { PAYMENT_METHODS } from '../expenses.constants';
import dayjs from 'dayjs';
import clsx from 'clsx';

interface PendingDuesTableProps {
  pendingDues: PendingDueExpense[];
  loading?: boolean;
}

export function PendingDuesTable({ pendingDues, loading }: PendingDuesTableProps) {
  const columns = [
    {
      key: 'itemName',
      title: 'Item',
      dataIndex: 'itemName',
      width: 150,
    },
    {
      key: 'vendorName',
      title: 'Vendor',
      dataIndex: 'vendorName',
      width: 150,
    },
    {
      key: 'quantity',
      title: 'Quantity',
      width: 120,
      render: (_: unknown, record: PendingDueExpense) => `${record.quantity} ${record.unitName || ''}`,
    },
    {
      key: 'rate',
      title: clsx('Rate', ' (', currency, ')'),
      dataIndex: 'rate',
      width: 120,
      align: 'right' as const,
      render: (rate: number) => rate.toFixed(2),
    },
    {
      key: 'total_amount',
      title: clsx('Total', ' (', currency, ')'),
      dataIndex: 'total_amount',
      width: 120,
      align: 'right' as const,
      render: (amount: number) => amount.toFixed(2),
    },
    {
      key: 'paid_amount',
      title: clsx('Paid', ' (', currency, ')'),
      dataIndex: 'paid_amount',
      width: 120,
      align: 'right' as const,
      render: (amount: number) => <Tag color="var(--color-blue-500)">{amount.toFixed(2)}</Tag>,
    },
    {
      key: 'pending_amount',
      title: clsx('Pending', ' (', currency, ')'),
      dataIndex: 'pending_amount',
      width: 130,
      align: 'right' as const,
      render: (amount: number) => (
        <Tag color="var(--color-red-500)" className="font-semibold">
          {amount.toFixed(2)}
        </Tag>
      ),
    },
    {
      key: 'payment_method',
      title: 'Payment Method',
      dataIndex: 'payment_method',
      width: 120,
      render: (method: keyof typeof PAYMENT_METHODS) => PAYMENT_METHODS[method],
    },
    {
      key: 'paid_date',
      title: 'Paid Date',
      dataIndex: 'paid_date',
      width: 120,
      render: (date: string) => dayjs(date).format(show_date_format),
    },
    {
      key: 'purchased_date',
      title: 'Purchased Date',
      dataIndex: 'purchased_date',
      width: 120,
      render: (date: string | null) => (date ? dayjs(date).format(show_date_format) : '-'),
    },
  ];

  return (
    <Table
      scroll={{ x: 'max-content' }}
      loading={loading}
      pagination={{ pageSize: 10, showSizeChanger: true }}
      columns={columns}
      dataSource={pendingDues}
      rowKey="id"
    />
  );
}
