import { useFormContext } from 'react-hook-form';
import { ExpenseForm as ExpenseFormType } from '../expenses.types';
import { currency } from '@shared/constants/app.constants';
import { AppSelect } from '@components/form/select/app-select';
import { useGetVendors } from '@modules/vendors/hooks/use-get-vendor';
import { useGetItems } from '@modules/items/hooks/use-get-item';
import { AppInputNumber } from '@components/form/input/app-number-input';
import { AppTextArea } from '@components/form/text-area/app-text-area';
import { SelectOrAddItem, SelectOrAddUnit, SelectOrAddVendor } from '@components/select-or-add';
import { PAYMENT_METHODS } from '../expenses.constants';
import { AppDatePicker } from '@components/form/date/app-date-picker';
import { useGetUnits } from '@modules/units/hooks/use-get-unit';
import { useAutoFill } from '../hooks/use-auto-fill';
import { AppRadioGroup } from '@components/form/app-radio-group';
import { disableFutureDates } from '@shared/utils/dayjs';

export function ExpenseForm() {
  const { isPending: isVendorLoading, tableData: vendors } = useGetVendors();
  const { isPending: isItemLoading, tableData: items } = useGetItems();
  const { tableData: units, isPending: isUnitLoading } = useGetUnits();
  const formHooks = useFormContext<ExpenseFormType>();
  const { control } = formHooks;

  const { amounts, hasDue } = useAutoFill();

  const vendorOptions = vendors?.map((vendor) => ({
    label: vendor.name,
    value: vendor.id,
  }));

  const itemOptions = items?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const unitOptions = units?.map((unit) => ({
    label: unit.name,
    value: unit.id,
  }));

  const paymentMethodOptions = Object.entries(PAYMENT_METHODS).map(([key, value]) => ({
    label: value,
    value: key,
  }));

  return (
    <div className="flex flex-wrap justify-between space-y-4 relative gap-x-6 gap-y-4">
      <div className="space-y-4 flex-grow">
        <div className="flex gap-x-2 gap-y-4 flex-wrap lg:flex-nowrap">
          <AppSelect
            label="Item"
            control={control}
            name="item_id"
            options={itemOptions}
            loading={isItemLoading}
            placeholder="Select an item"
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
            popupRender={(menu) => <SelectOrAddItem menu={menu} />}
          />
          <AppSelect
            label="Vendor"
            control={control}
            name="vendor_id"
            options={vendorOptions}
            loading={isVendorLoading}
            placeholder="Select a vendor"
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
        </div>
        <div className="flex gap-x-2 gap-y-4 flex-wrap lg:flex-nowrap">
          <AppInputNumber
            label="Quantity"
            control={control}
            name="quantity"
            placeholder="Enter quantity"
            required
            min={0.01}
          />
          <AppSelect
            loading={isUnitLoading}
            required
            label="Unit"
            control={control}
            name="unit_id"
            options={unitOptions}
            popupRender={(menu) => <SelectOrAddUnit menu={menu} />}
          />
          <AppInputNumber
            label="Rate Per Unit"
            control={control}
            name="rate"
            placeholder="Enter rate"
            required
            prefix={currency + ' |'}
            min={0}
          />
        </div>
        <div className="flex gap-4 flex-wrap lg:flex-nowrap">
          <AppDatePicker
            label="Purchased Date"
            control={control}
            name="purchased_date"
            placeholder="Select purchased date"
          />
          <AppDatePicker
            required
            label="Paid Date"
            control={control}
            name="paid_date"
            placeholder="Select paid date"
            disabledDate={disableFutureDates}
          />
        </div>
        <div className="flex gap-x-2 gap-y-4 flex-wrap lg:flex-nowrap">
          <AppRadioGroup
            required
            label="Payment Method"
            control={control}
            name="payment_method"
            options={paymentMethodOptions}
          />
          <AppInputNumber
            size="large"
            label="Paid Amount"
            control={control}
            name="paid_amount"
            placeholder="Enter paid amount"
            required
            prefix={currency + ' |'}
            min={0}
          />
        </div>
      </div>
      <div className="sticky top-10 flex-grow">
        <div className="space-y-4">
          <AppTextArea
            label="Description"
            control={control}
            name="description"
            placeholder="Enter expense description (optional)"
            style={{ resize: 'none' }}
            showCount
            maxLength={250}
          />

          <div className="mt-10 flex flex-col p-4 bg-primary-50 border-2 border-primary-200 rounded-lg">
            <p className="font-semibold text-primary-400">Total Amount</p>
            <div className="text-2xl font-bold text-primary-600">
              {currency} {(amounts.total || 0).toFixed(2)}
            </div>
          </div>

          <div
            className={`flex flex-col p-4 border-2 rounded-lg ${
              hasDue
                ? 'bg-orange-50 border-orange-300'
                : amounts.due < 0
                  ? 'bg-red-50 border-red-300'
                  : 'bg-green-50 border-green-300'
            }`}
          >
            <p
              className={`text-base font-semibold ${
                hasDue ? 'text-orange-800' : amounts.due < 0 ? 'text-red-800' : 'text-green-800'
              }`}
            >
              Due Amount {amounts.due === 0 && '✓'}
            </p>
            <div
              className={`text-2xl font-bold ${
                hasDue ? 'text-orange-900' : amounts.due < 0 ? 'text-red-900' : 'text-green-900'
              }`}
            >
              {currency} {Math.abs(amounts.due).toFixed(2)}
              {amounts.due < 0 && <span className="text-sm ml-2">(Overpaid)</span>}
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
