import { Table, Tag } from 'antd';
import { WeeklyExpenseReport } from '@apis/expenses/use-weekly-expenses.query';
import { currency, show_date_format } from '@shared/constants/app.constants';
import { PAYMENT_METHODS } from '../expenses.constants';
import dayjs from 'dayjs';
import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

interface WeeklyExpenseTableProps {
  weeklyReports: WeeklyExpenseReport[];
  loading?: boolean;
}

export function WeeklyExpenseTable({ weeklyReports, loading }: WeeklyExpenseTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (weekKey: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(weekKey)) {
      newExpanded.delete(weekKey);
    } else {
      newExpanded.add(weekKey);
    }
    setExpandedRows(newExpanded);
  };

  const columns = [
    {
      key: 'week',
      title: 'Week',
      dataIndex: 'weekLabel',
      width: 200,
      render: (label: string, record: WeeklyExpenseReport) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleRow(record.weekStart)}
            className="flex items-center gap-1 hover:text-primary-400 transition-colors"
          >
            {expandedRows.has(record.weekStart) ? <RiArrowUpSLine size={16} /> : <RiArrowDownSLine size={16} />}
            <span className="font-medium">{label}</span>
          </button>
          <span className="text-xs text-gray-500">
            ({dayjs(record.weekStart).format(show_date_format)} - {dayjs(record.weekEnd).format(show_date_format)})
          </span>
        </div>
      ),
    },
    {
      key: 'expenseCount',
      title: 'Expenses',
      dataIndex: 'expenseCount',
      width: 100,
      align: 'center' as const,
    },
    {
      key: 'totalAmount',
      title: clsx('Total Amount', ' (', currency, ')'),
      dataIndex: 'totalAmount',
      width: 150,
      align: 'right' as const,
      render: (amount: number) => <span className="font-semibold">{amount.toFixed(2)}</span>,
    },
    {
      key: 'paidAmount',
      title: clsx('Paid', ' (', currency, ')'),
      dataIndex: 'paidAmount',
      width: 150,
      align: 'right' as const,
      render: (amount: number, record: WeeklyExpenseReport) => {
        const isFullyPaid = record.totalAmount === record.paidAmount;
        return <Tag color={isFullyPaid ? 'var(--color-green-500)' : 'var(--color-blue-500)'}>{amount.toFixed(2)}</Tag>;
      },
    },
    {
      key: 'pendingAmount',
      title: clsx('Pending', ' (', currency, ')'),
      dataIndex: 'pendingAmount',
      width: 150,
      align: 'right' as const,
      render: (amount: number) => (
        <Tag color={amount > 0 ? 'var(--color-red-500)' : 'var(--color-green-500)'}>{amount.toFixed(2)}</Tag>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <Table
        scroll={{ x: 'max-content' }}
        loading={loading}
        pagination={false}
        columns={columns}
        dataSource={weeklyReports}
        rowKey="weekStart"
        expandable={{
          expandedRowKeys: Array.from(expandedRows),
          onExpand: (_, record) => toggleRow(record.weekStart),
          expandedRowRender: (record: WeeklyExpenseReport) => (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-3 text-sm">Expenses for {record.weekLabel}</h4>
              <Table
                size="small"
                pagination={false}
                columns={[
                  { key: 'item', title: 'Item', dataIndex: 'itemName', width: 150 },
                  { key: 'vendor', title: 'Vendor', dataIndex: 'vendorName', width: 150 },
                  {
                    key: 'quantity',
                    title: 'Quantity',
                    width: 120,
                    render: (_, expense) => `${expense.quantity} ${expense.unitName || ''}`,
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
                    render: (amount: number, expense) => {
                      const isFullyPaid = expense.total_amount === expense.paid_amount;
                      return (
                        <Tag color={isFullyPaid ? 'var(--color-green-500)' : 'var(--color-blue-500)'}>
                          {amount.toFixed(2)}
                        </Tag>
                      );
                    },
                  },
                  {
                    key: 'pending_amount',
                    title: clsx('Pending', ' (', currency, ')'),
                    dataIndex: 'pending_amount',
                    width: 120,
                    align: 'right' as const,
                    render: (amount: number) => (
                      <Tag color={amount > 0 ? 'var(--color-red-500)' : 'var(--color-green-500)'}>
                        {amount.toFixed(2)}
                      </Tag>
                    ),
                  },
                  {
                    key: 'payment_method',
                    title: 'Payment',
                    dataIndex: 'payment_method',
                    width: 100,
                    render: (method: keyof typeof PAYMENT_METHODS) => PAYMENT_METHODS[method],
                  },
                  {
                    key: 'paid_date',
                    title: 'Paid Date',
                    dataIndex: 'paid_date',
                    width: 120,
                    render: (date: string) => dayjs(date).format(show_date_format),
                  },
                ]}
                dataSource={record.expenses}
                rowKey="id"
              />
            </div>
          ),
        }}
      />
    </div>
  );
}
