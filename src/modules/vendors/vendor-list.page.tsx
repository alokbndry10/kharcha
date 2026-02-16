import IconHover from '@components/icon-hover';
import { PageTitle } from '@components/page-title';
import { PageLayout } from '@shared/layouts/setting-layout/page-layout.view';
import { Button, Popconfirm, Table } from 'antd';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import { FormProvider } from 'react-hook-form';
import { useGetVendors } from './hooks/use-get-vendor';
import { useUpdateVendor } from './hooks/use-update-vendor';
import { VendorForm } from './components/vendor.form';
import { DebounceInput } from '@components/form/input/debounce-input';
import AppModal from '@components/form/Modal/app-modal';
import { useDeleteVendor } from './hooks/use-delete-vendor';
import { VendorTableRow } from './vendors.types';
import { Link } from 'react-router-dom';

function VendorListPage() {
  const { tableData, isPending, setFilters } = useGetVendors();
  const { modalData, submitHandler, isPending: updating, formHooks, setModalData } = useUpdateVendor();
  const { deleteId, deleting, deleteHandler } = useDeleteVendor();

  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle
          title="Vendors"
          subTitle="Vendor list"
          endElement={
            <Link to="/vendors/add">
              <Button variant="outlined" color="primary" className="!rounded-4xl">
                Create Vendor
              </Button>
            </Link>
          }
        />
      </PageLayout.Header>
      <PageLayout.Body className="py-6 space-y-6">
        <div className="space-y-4">
          <div className="w-72">
            <DebounceInput
              allowClear
              placeholder="Search vendors..."
              setDebouncedValue={(name) => {
                setFilters((filters) => ({ ...filters, name }));
              }}
            />
          </div>
          <Table
            pagination={false}
            loading={isPending}
            columns={[
              { key: 'sn', title: 'S.N', dataIndex: 'sn' },
              { key: 'name', title: 'Name', dataIndex: 'name' },
              {
                key: 'action',
                title: 'Action',
                render: (data: VendorTableRow) => (
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
            title="Update Vendor"
            isOpen={!!modalData}
            closeModal={() => setModalData(null)}
            loading={updating}
            submitHandler={submitHandler}
          >
            <form onSubmit={submitHandler}>
              <FormProvider {...formHooks}>
                <VendorForm />
              </FormProvider>
            </form>
          </AppModal>
        </div>
      </PageLayout.Body>
    </PageLayout>
  );
}

export default VendorListPage;
