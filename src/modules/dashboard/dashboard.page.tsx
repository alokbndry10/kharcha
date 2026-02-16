import { PageTitle } from '@components/page-title';
import { PageLayout } from '@shared/layouts/setting-layout/page-layout.view';
import { Card, DatePicker, Row, Col, Statistic, Button } from 'antd';
import { useWeeklyExpenseReport } from '../expenses/hooks/use-weekly-expense-report';
//import { WeeklyExpenseTable } from '../expenses/components/weekly-expense-table';
import { PendingDuesTable } from '../expenses/components/pending-dues-table';
import { usePendingDuesQuery } from '@apis/expenses/use-pending-dues.query';
import { currency, show_date_format } from '@shared/constants/app.constants';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { disableFutureDates } from '@shared/utils/dayjs';
import { pluralize } from '@shared/utils/helpers';

export default function DashboardPage() {
  const {
    //weeklyReports,
    totals,
    isPending,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
  } = useWeeklyExpenseReport();
  const { data: pendingDuesData, isPending: isPendingDuesLoading } = usePendingDuesQuery();

  const is7DaysActive = useMemo(() => {
    return fromDate === dayjs().subtract(7, 'day').format('YYYY-MM-DD');
  }, [fromDate]);
  const is30DaysActive = useMemo(() => {
    return fromDate === dayjs().subtract(30, 'day').format('YYYY-MM-DD');
  }, [fromDate]);

  const istodayActive = useMemo(() => {
    return fromDate === dayjs().format('YYYY-MM-DD');
  }, [fromDate]);

  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle title="Dashboard" subTitle="Expense Reports" />
      </PageLayout.Header>
      <PageLayout.Body className="py-6 space-y-6">
        <div className="space-y-4">
          {/* Date Range Filter */}
          <Card title="Filters">
            <div className="flex gap-6 items-end">
              <div className="flex gap-4 items-end flex-wrap md:border-r border-gray-800 md:pr-6">
                <div className="min-w-[200px]">
                  <label className="block text-sm font-medium mb-2 text-text-400">From Date</label>
                  <DatePicker
                    className="w-full"
                    disabledDate={disableFutureDates}
                    value={fromDate ? dayjs(fromDate) : null}
                    onChange={(date) => setFromDate(date ? date.format('YYYY-MM-DD') : null)}
                    format={show_date_format}
                    allowClear
                  />
                </div>
                <div className="min-w-[200px]">
                  <label className="block text-sm font-medium mb-2 text-text-400">To Date</label>
                  <DatePicker
                    className="w-full"
                    disabledDate={disableFutureDates}
                    value={toDate ? dayjs(toDate) : null}
                    onChange={(date) => setToDate(date ? date.format('YYYY-MM-DD') : null)}
                    format={show_date_format}
                    allowClear
                  />
                </div>
              </div>
              <div className="flex gap-4 flex-wrap justify-end">
                <Button
                  type={is7DaysActive ? 'primary' : 'default'}
                  className="!rounded-4xl"
                  onClick={() => {
                    setFromDate(dayjs().subtract(7, 'day').format('YYYY-MM-DD'));
                    setToDate(dayjs().format('YYYY-MM-DD'));
                  }}
                >
                  7 Days
                </Button>
                <Button
                  type={is30DaysActive ? 'primary' : 'default'}
                  className="!rounded-4xl"
                  onClick={() => {
                    setFromDate(dayjs().subtract(30, 'day').format('YYYY-MM-DD'));
                    setToDate(dayjs().format('YYYY-MM-DD'));
                  }}
                >
                  30 Days
                </Button>
                <Button
                  type={istodayActive ? 'primary' : 'default'}
                  className="!rounded-4xl"
                  onClick={() => {
                    setFromDate(dayjs().format('YYYY-MM-DD'));
                    setToDate(dayjs().format('YYYY-MM-DD'));
                  }}
                >
                  Today
                </Button>
              </div>
            </div>
          </Card>

          {/* Summary Statistics */}
          <Row gutter={[16, 16]} className="mt-4">
            <Col xs={24} sm={12} lg={6}>
              <Card className="shadow-sm">
                <Statistic
                  loading={isPending}
                  title={<p className="text-lg text-text-700">Total Expenses</p>}
                  value={pluralize(totals.expenseCount, 'Item')}
                  valueStyle={{ color: 'var(--color-primary-500)' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="shadow-sm">
                <Statistic
                  loading={isPending}
                  title={<p className="text-lg text-text-700">{clsx('Total Amount', ' (', currency, ')')}</p>}
                  value={totals.totalAmount}
                  precision={2}
                  valueStyle={{ color: 'var(--color-primary-500)' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="shadow-sm">
                <Statistic
                  loading={isPending}
                  title={<p className="text-lg text-text-700">{clsx('Paid Amount', ' (', currency, ')')}</p>}
                  value={totals.paidAmount}
                  precision={2}
                  valueStyle={{ color: 'var(--color-green-600)' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="shadow-sm">
                <Statistic
                  loading={isPending}
                  title={<p className="text-lg text-text-700">{clsx('Pending Amount', ' (', currency, ')')}</p>}
                  value={totals.pendingAmount}
                  precision={2}
                  valueStyle={{ color: totals.pendingAmount > 0 ? 'var(--color-red-500)' : 'var(--color-green-600)' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Weekly Expense Table
          <div className="mt-4">
            <Card title="Weekly Expense Report" loading={isPending}>
              {weeklyReports.length > 0 ? (
                <WeeklyExpenseTable weeklyReports={weeklyReports} loading={isPending} />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {isPending ? 'Loading...' : 'No expenses found for the selected date range.'}
                </div>
              )}
            </Card>
          </div>
           */}

          {/* Pending Dues Table */}
          <div className="mt-4">
            <Card
              title={
                <div className="flex justify-between items-center">
                  <span>Pending Dues</span>
                  {pendingDuesData && (
                    <span className="text-sm font-normal text-text-600">
                      Total Pending: {clsx(currency, ' ', pendingDuesData.totalPending.toFixed(2))}
                    </span>
                  )}
                </div>
              }
              loading={isPendingDuesLoading}
            >
              {pendingDuesData && pendingDuesData.data.length > 0 ? (
                <PendingDuesTable pendingDues={pendingDuesData.data} loading={isPendingDuesLoading} />
              ) : (
                <div className="text-center py-8 text-text-300 italic">
                  {isPendingDuesLoading ? 'Loading...' : 'No pending dues. All expenses are fully paid.'}
                </div>
              )}
            </Card>
          </div>
        </div>
      </PageLayout.Body>
    </PageLayout>
  );
}
