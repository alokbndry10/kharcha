import IconHover from '@components/icon-hover';
import { PageTitle } from '@components/page-title';
import { PageLayout } from '@shared/layouts/setting-layout/page-layout.view';
import { Button, Popconfirm, Table } from 'antd';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import { FormProvider } from 'react-hook-form';
import { useGetItems } from './hooks/use-get-item';
import { useUpdateItem } from './hooks/use-update-item';
import { ItemTableRow } from './items.types';
import { ItemForm } from './components/item.form';
import { DebounceInput } from '@components/form/input/debounce-input';
import AppModal from '@components/form/Modal/app-modal';
import { useDeleteItem } from './hooks/use-delete-item';
import clsx from 'clsx';
import { currency } from '@shared/constants/app.constants';
import { Link } from 'react-router-dom';

function ItemListPage() {
  const { tableData, isPending, setFilters } = useGetItems();
  const { modalData, submitHandler, isPending: updating, formHooks, setModalData } = useUpdateItem();
  const { deleteId, deleting, deleteHandler } = useDeleteItem();

  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle
          title="Items"
          subTitle="Item list"
          endElement={
            <Link to="/items/add">
              <Button variant="outlined" color="primary" className="!rounded-4xl">
                Create Item
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
              placeholder="Search items..."
              setDebouncedValue={(name) => {
                setFilters((filters) => ({ ...filters, name }));
              }}
            />
          </div>
          <Table
            scroll={{ x: 'max-content' }}
            loading={isPending}
            pagination={{ hideOnSinglePage: true }}
            columns={[
              { key: 'sn', title: 'S.N', dataIndex: 'sn' },
              { key: 'name', title: 'Name', dataIndex: 'name' },
              { key: 'vendor_name', title: 'Vendor', dataIndex: 'vendorName' },
              { key: 'current_rate', title: clsx('Rate', ' (', currency, ')'), dataIndex: 'current_rate' },
              { key: 'unitName', title: 'Unit', dataIndex: 'unitName' },
              {
                key: 'action',
                title: 'Action',
                render: (data: ItemTableRow) => (
                  <div className="flex gap-2">
                    <IconHover onClick={() => setModalData(data)}>
                      <RiEditLine size={20} color="var(--color-primary-400)" />
                    </IconHover>
                    <IconHover loading={`${data.id}-${data.vendor_id}` === deleteId && deleting}>
                      <Popconfirm
                        title="Are you sure to delete?"
                        okText="Delete"
                        onConfirm={() => deleteHandler(data.id, data.vendor_id)}
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
            title="Update Item"
            isOpen={!!modalData}
            closeModal={() => setModalData(null)}
            loading={updating}
            submitHandler={submitHandler}
          >
            <form onSubmit={submitHandler}>
              <FormProvider {...formHooks}>
                <ItemForm />
              </FormProvider>
            </form>
          </AppModal>
        </div>
      </PageLayout.Body>
    </PageLayout>
  );
}

export default ItemListPage;
