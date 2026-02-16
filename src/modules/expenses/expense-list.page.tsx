import IconHover from '@components/icon-hover';
import { PageTitle } from '@components/page-title';
import { PageLayout } from '@shared/layouts/setting-layout/page-layout.view';
import { Button, DatePicker, Popconfirm, Table, Tag } from 'antd';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import { FormProvider } from 'react-hook-form';
import { useGetExpenses } from './hooks/use-get-expense';
import { useUpdateExpense } from './hooks/use-update-expense';
import { ExpenseTableRow } from './expenses.types';
import { ExpenseForm } from './components/expense.form';
import { DebounceInput } from '@components/form/input/debounce-input';
import AppModal from '@components/form/Modal/app-modal';
import { useDeleteExpense } from './hooks/use-delete-expense';
import clsx from 'clsx';
import { currency, show_date_format } from '@shared/constants/app.constants';
import { PAYMENT_METHODS } from './expenses.constants';
import dayjs from 'dayjs';
import { useTablePagination } from '@shared/hooks/use-table-pagination';
import { Link } from 'react-router-dom';

function ExpenseListPage() {
  const { tableData, total, page, pageSize, isPending, setFilters } = useGetExpenses();
  const { modalData, submitHandler, isPending: updating, formHooks, setModalData } = useUpdateExpense();
  const { deleteId, deleting, deleteHandler } = useDeleteExpense();
  const { pagination, onTableChange } = useTablePagination({
    total,
    page,
    pageSize,
    setFilters,
    options: { hideOnSinglePage: true, showSizeChanger: false },
  });

  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle
          title="Expenses"
          subTitle="Expense list"
          endElement={
            <Link to="/expenses/add">
              <Button variant="outlined" color="primary" className="!rounded-4xl">
                Create Expense
              </Button>
            </Link>
          }
        />
      </PageLayout.Header>
      <PageLayout.Body className="py-6 space-y-6">
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap justify-between">
            <div className="w-72">
              <DebounceInput
                allowClear
                placeholder="Search expenses..."
                setDebouncedValue={(search) => {
                  setFilters((filters) => ({ ...filters, search, page: 1 }));
                }}
              />
            </div>
            <div className="w-72">
              <DatePicker.RangePicker
                allowClear
                onChange={(_, dateStrings) => {
                  const [fromDate, toDate] = dateStrings;
                  setFilters((filters) => ({
                    ...filters,
                    fromDate: fromDate || null,
                    toDate: toDate || null,
                    page: 1,
                  }));
                }}
              />
            </div>
          </div>
          <Table
            sticky
            scroll={{ x: 'max-content' }}
            pagination={pagination}
            loading={isPending}
            onChange={(p) => onTableChange(p)}
            columns={[
              { key: 'sn', title: 'S.N', dataIndex: 'sn', width: 70 },
              { key: 'itemName', title: 'Item', dataIndex: 'itemName' },
              { key: 'vendorName', title: 'Vendor', dataIndex: 'vendorName' },
              {
                key: 'quantity',
                title: 'Quantity',
                dataIndex: 'quantity',
                render: (qty: number, record: ExpenseTableRow) => `${qty} ${record.unitName || ''}`,
              },
              {
                key: 'rate',
                title: clsx('Rate', ' (', currency, ')'),
                dataIndex: 'rate',
                render: (rate: number) => rate,
              },
              {
                key: 'total_amount',
                title: clsx('Total', ' (', currency, ')'),
                dataIndex: 'total_amount',
                render: (amount: number) => amount,
              },
              {
                key: 'paid_amount',
                title: clsx('Paid', ' (', currency, ')'),
                dataIndex: 'paid_amount',
                render: (amount: number, data) => {
                  const hasPaid = data.total_amount === data.paid_amount;
                  return <Tag color={hasPaid ? 'var(--color-green-500)' : 'var(--color-red-500)'}>{amount}</Tag>;
                },
              },
              {
                key: 'payment_method',
                title: 'Payment',
                dataIndex: 'payment_method',
                render: (method: keyof typeof PAYMENT_METHODS) => PAYMENT_METHODS[method],
              },
              {
                key: 'purchased_date',
                title: 'Purchased Date',
                dataIndex: 'purchased_date',
                render: (date: string) => (date ? dayjs(date).format(show_date_format) : '-'),
              },
              {
                key: 'paid_date',
                title: 'Paid Date',
                dataIndex: 'paid_date',
                render: (date: string) => dayjs(date).format(show_date_format),
              },
              {
                key: 'action',
                title: 'Action',
                width: 100,
                render: (data: ExpenseTableRow) => (
                  <div className="flex gap-2">
                    <IconHover onClick={() => setModalData(data)}>
                      <RiEditLine size={20} color="var(--color-primary-400)" />
                    </IconHover>
                    <IconHover loading={data.id === deleteId && deleting}>
                      <Popconfirm
                        title="Are you sure to delete?"
                        okText="Delete"
                        onConfirm={() => deleteHandler(data.id)}
                      >
                        <RiDeleteBinLine size={20} color="var(--color-red-500)" />
                      </Popconfirm>
                    </IconHover>
                  </div>
                ),
              },
            ]}
            dataSource={tableData}
          />
          <AppModal
            title="Update Expense"
            width={650}
            isOpen={!!modalData}
            closeModal={() => setModalData(null)}
            loading={updating}
            submitHandler={submitHandler}
          >
            <form onSubmit={submitHandler}>
              <FormProvider {...formHooks}>
                <ExpenseForm />
              </FormProvider>
            </form>
          </AppModal>
        </div>
      </PageLayout.Body>
    </PageLayout>
  );
}

export default ExpenseListPage;
