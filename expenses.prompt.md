Carefully Observer src/modules/items folder and understand the code structure and logic. Crawl other related file tree if needed. Here I have applied relationship logic too with VendorItem.

Now I want to create a new module for Expenses. It should be similar to the items module but with the following changes:

1. It has fields as:
description: nullable and text
item_id: non nullable and reference to items module
vendor_id: non nullable and reference to vendors module, prefilled from units of items module
quantity: non nullable and number
payment_method: enum of [cash, bank, card], create object in expenses.constants.ts file in expenses module and also extract union type for payment method
rate: non nullable and number, prefilled from units of items module
paid_amount: non nullable and number
total_amount: non nullable and number
paid_date: default select today. AppDatePicker in shared/components/ui/date-picker.tsx

learn and create a similar crud module for expenses.