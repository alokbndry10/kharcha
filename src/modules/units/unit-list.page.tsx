import IconHover from '@components/icon-hover';
import { PageTitle } from '@components/page-title';
import { PageLayout } from '@shared/layouts/setting-layout/page-layout.view';
import { Button, Popconfirm, Table } from 'antd';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import { FormProvider } from 'react-hook-form';
import { useGetUnits } from './hooks/use-get-unit';
import { useUpdateUnit } from './hooks/use-update-unit';
import { UnitTableRow } from './units.types';
import { UnitForm } from './components/unit.form';
import { DebounceInput } from '@components/form/input/debounce-input';
import AppModal from '@components/form/Modal/app-modal';
import { useDeleteUnit } from './hooks/use-delete-unit';
import { Link } from 'react-router-dom';

function UnitListPage() {
  const { tableData, isPending, setFilters } = useGetUnits();
  const { modalData, submitHandler, isPending: updating, formHooks, setModalData } = useUpdateUnit();
  const { deleteId, deleting, deleteHandler } = useDeleteUnit();

  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle
          title="Units"
          subTitle="Unit list"
          endElement={
            <Link to="/units/add">
              <Button variant="outlined" color="primary" className="!rounded-4xl">
                Create Unit
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
              placeholder="Search units..."
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
                render: (data: UnitTableRow) => (
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
            title="Update Unit"
            isOpen={!!modalData}
            closeModal={() => setModalData(null)}
            loading={updating}
            submitHandler={submitHandler}
          >
            <form onSubmit={submitHandler}>
              <FormProvider {...formHooks}>
                <UnitForm />
              </FormProvider>
            </form>
          </AppModal>
        </div>
      </PageLayout.Body>
    </PageLayout>
  );
}

export default UnitListPage;
