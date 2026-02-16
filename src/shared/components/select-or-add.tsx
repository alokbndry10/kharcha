import { cacheOnAddUnit } from '@apis/units/units.cache';
import { useAddUnitsMutation } from '@apis/units/use-units.mutation';
import { useAddVendorsMutation } from '@apis/vendors/use-vendors.mutation';
import { cacheOnAddVendor } from '@apis/vendors/vendors.cache';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Space, notification } from 'antd';
import { JSX, useState } from 'react';
import AppModal from './form/Modal/app-modal';
import { FormProvider } from 'react-hook-form';
import { useAddItem } from '@modules/items/hooks/use-add-item';
import { ItemForm } from '@modules/items/components/item.form';

export function SelectOrAddVendor({ menu }: { menu: JSX.Element }) {
  const [searchName, setSearchName] = useState('');
  const { mutate: addVendor, isPending: createLoading } = useAddVendorsMutation();

  function addVendorHandler() {
    if (!searchName.trim()) return notification.error({ message: 'Input is empty' });

    addVendor(
      { name: searchName },
      {
        onSuccess: (createdVendor) => {
          notification.success({ message: 'Vendor created successfully' });
          cacheOnAddVendor({ id: createdVendor.id, name: createdVendor.name });
        },
      }
    );
  }

  return (
    <>
      {menu}
      <Divider style={{ margin: '8px 0' }} />
      <Space style={{ padding: '0 8px 4px' }}>
        <Input
          placeholder="Please enter vendor"
          value={searchName}
          onChange={(e) => setSearchName(e?.target?.value)}
          onKeyDown={(e) => e.stopPropagation()}
        />
        <Button icon={<PlusOutlined />} onClick={addVendorHandler} loading={createLoading}>
          Add Vendor
        </Button>
      </Space>
    </>
  );
}

export function SelectOrAddUnit({ menu }: { menu: JSX.Element }) {
  const [searchName, setSearchName] = useState('');
  const { mutate: addUnit, isPending: createLoading } = useAddUnitsMutation();

  function addUnitHandler() {
    if (!searchName.trim()) return notification.error({ message: 'Input is empty' });

    addUnit(
      { name: searchName },
      {
        onSuccess: (createdUnit) => {
          notification.success({ message: 'Unit created successfully' });
          cacheOnAddUnit({ id: createdUnit.id, name: createdUnit.name });
        },
      }
    );
  }

  return (
    <>
      {menu}
      <Divider style={{ margin: '8px 0' }} />
      <Space style={{ padding: '0 8px 4px' }}>
        <Input
          placeholder="Please enter unit"
          value={searchName}
          onChange={(e) => setSearchName(e?.target?.value)}
          onKeyDown={(e) => e.stopPropagation()}
        />
        <Button icon={<PlusOutlined />} onClick={addUnitHandler} loading={createLoading}>
          Add Unit
        </Button>
      </Space>
    </>
  );
}

export function SelectOrAddItem({ menu }: { menu: JSX.Element }) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { formHooks, submitHandler, isPending } = useAddItem();

  function submitModalHandler() {
    submitHandler();
    setOpenAddModal(false);
  }

  return (
    <>
      {menu}
      <Divider style={{ margin: '8px 0' }} />
      <Button className="w-full" icon={<PlusOutlined />} onClick={() => setOpenAddModal(true)} loading={isPending}>
        Add Item
      </Button>
      <AppModal
        title="Create Item"
        width={650}
        isOpen={openAddModal}
        closeModal={() => setOpenAddModal(false)}
        loading={isPending}
        submitHandler={submitModalHandler}
      >
        <FormProvider {...formHooks}>
          <ItemForm />
        </FormProvider>
      </AppModal>
    </>
  );
}
