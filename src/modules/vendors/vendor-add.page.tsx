import { PageTitle } from '@components/page-title';
import { FormPageLayout } from '@shared/layouts/app-layout/components/form-layout';
import { PageLayout } from '@shared/layouts/setting-layout/page-layout.view';
import { FormProvider } from 'react-hook-form';
import { useAddVendor } from './hooks/use-add-vendor';
import { VendorForm } from './components/vendor.form';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

function AddVendor() {
  const { formHooks, submitHandler, isPending } = useAddVendor();

  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle
          title="Add Vendor"
          subTitle="Add a vendor"
          endElement={
            <Link to="/vendors">
              <Button variant="outlined" color="primary" className="!rounded-4xl">
                List Vendors
              </Button>
            </Link>
          }
        />
      </PageLayout.Header>
      <PageLayout.Body className="py-6 space-y-6">
        <FormProvider {...formHooks}>
          <FormPageLayout onSubmit={submitHandler} loading={isPending}>
            <VendorForm />
          </FormPageLayout>
        </FormProvider>
      </PageLayout.Body>
    </PageLayout>
  );
}

export default AddVendor;
