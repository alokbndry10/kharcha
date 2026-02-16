import { PageTitle } from '@components/page-title';
import { FormPageLayout } from '@shared/layouts/app-layout/components/form-layout';
import { PageLayout } from '@shared/layouts/setting-layout/page-layout.view';
import { FormProvider } from 'react-hook-form';
import { useAddExpense } from './hooks/use-add-expense';
import { ExpenseForm } from './components/expense.form';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

function AddExpense() {
  const { formHooks, submitHandler, isPending } = useAddExpense();

  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle
          title="Add Expense"
          subTitle="Add a new expense"
          endElement={
            <Link to="/expenses">
              <Button variant="outlined" color="primary" className="!rounded-4xl">
                List Expenses
              </Button>
            </Link>
          }
        />
      </PageLayout.Header>
      <PageLayout.Body className="py-6 space-y-6">
        <FormProvider {...formHooks}>
          <FormPageLayout onSubmit={submitHandler} loading={isPending}>
            <ExpenseForm />
          </FormPageLayout>
        </FormProvider>
      </PageLayout.Body>
    </PageLayout>
  );
}

export default AddExpense;
