import { AppInput } from '@components/form/input/app-input';
import { useFormContext } from 'react-hook-form';
import { ItemForm as ItemFormType } from '../items.types';
import { currency, tenant_name } from '@shared/constants/app.constants';
import { AppSelect } from '@components/form/select/app-select';
import { useGetVendors } from '@modules/vendors/hooks/use-get-vendor';
import { useGetUnits } from '@modules/units/hooks/use-get-unit';
import { AppInputNumber } from '@components/form/input/app-number-input';
import { AppTextArea } from '@components/form/text-area/app-text-area';
import { SelectOrAddUnit, SelectOrAddVendor } from '@components/select-or-add';
import { useScreenSize } from '@shared/hooks/use-screen';

export function ItemForm() {
  const { isMobile } = useScreenSize();
  const { isPending: isVendorLoading, tableData: vendors } = useGetVendors();
  const { isPending: isUnitLoading, tableData: units } = useGetUnits();
  const vendorOptions = vendors?.map((vendor) => ({
    label: vendor.name,
    value: vendor.id,
  }));
  const unitOptions = units?.map((unit) => ({
    label: unit.name,
    value: unit.id,
  }));
  const formHooks = useFormContext<ItemFormType>();
  const { control } = formHooks;

  return (
    <div className="space-y-4 max-w-96">
      <AppInput
        label="Name"
        autoFocus={!isMobile}
        required
        control={control}
        name="name"
        placeholder="Example: Chicken"
      />
      <AppSelect
        label="Vendor"
        control={control}
        name="vendor_id"
        options={vendorOptions}
        loading={isVendorLoading}
        placeholder={'Example: ' + tenant_name}
        required
        allowClear
        showSearch
        filterOption={(input: string, option) => {
          if (typeof option?.label === 'string') {
            return option?.label?.toLowerCase().includes(input?.toLowerCase());
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return option as any;
        }}
        popupRender={(menu) => <SelectOrAddVendor menu={menu} />}
      />
      <AppTextArea
        label="Description"
        control={control}
        name="description"
        placeholder="Example: Write some item description"
        style={{ resize: 'none' }}
        showCount
        maxLength={150}
      />
      <AppInputNumber
        label="Rate Per Unit"
        control={control}
        name="current_rate"
        placeholder="Example: 12.5"
        prefix={currency + ' |'}
      />
      <AppSelect
        label="Unit"
        control={control}
        name="unit_id"
        options={unitOptions}
        loading={isUnitLoading}
        placeholder={'Example: kg'}
        allowClear
        showSearch
        filterOption={(input: string, option) => {
          if (typeof option?.label === 'string') {
            return option?.label?.toLowerCase().includes(input?.toLowerCase());
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return option as any;
        }}
        popupRender={(menu) => <SelectOrAddUnit menu={menu} />}
      />
    </div>
  );
}
