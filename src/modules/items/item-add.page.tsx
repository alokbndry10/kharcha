import { PageTitle } from '@components/page-title';
import { FormPageLayout } from '@shared/layouts/app-layout/components/form-layout';
import { PageLayout } from '@shared/layouts/setting-layout/page-layout.view';
import { FormProvider } from 'react-hook-form';
import { useAddItem } from './hooks/use-add-item';
import { ItemForm } from './components/item.form';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

function AddItem() {
  const { formHooks, submitHandler, isPending } = useAddItem();

  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle
          title="Add Item"
          subTitle="Add a item"
          endElement={
            <Link to="/items">
              <Button variant="outlined" color="primary" className="!rounded-4xl">
                List Items
              </Button>
            </Link>
          }
        />
      </PageLayout.Header>
      <PageLayout.Body className="py-6 space-y-6">
        <FormProvider {...formHooks}>
          <FormPageLayout onSubmit={submitHandler} loading={isPending}>
            <ItemForm />
          </FormPageLayout>
        </FormProvider>
      </PageLayout.Body>
    </PageLayout>
  );
}

export default AddItem;
