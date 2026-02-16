import { PageTitle } from '@components/page-title';
import { FormPageLayout } from '@shared/layouts/app-layout/components/form-layout';
import { PageLayout } from '@shared/layouts/setting-layout/page-layout.view';
import { FormProvider } from 'react-hook-form';
import { useAddUnit } from './hooks/use-add-unit';
import { UnitForm } from './components/unit.form';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

function AddUnit() {
  const { formHooks, submitHandler, isPending } = useAddUnit();

  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle
          title="Add Unit"
          subTitle="Add a unit"
          endElement={
            <Link to="/units">
              <Button variant="outlined" color="primary" className="!rounded-4xl">
                List Units
              </Button>
            </Link>
          }
        />
      </PageLayout.Header>
      <PageLayout.Body className="py-6 space-y-6">
        <FormProvider {...formHooks}>
          <FormPageLayout onSubmit={submitHandler} loading={isPending}>
            <UnitForm />
          </FormPageLayout>
        </FormProvider>
      </PageLayout.Body>
    </PageLayout>
  );
}

export default AddUnit;
