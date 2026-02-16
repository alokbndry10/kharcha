import z from 'zod';

export const ItemSchema = z.object({
  name: z.string({ invalid_type_error: 'Name is required' }).min(1, 'Name is required'),
  description: z.string().optional(),
  current_rate: z.number().nullable(),
  unit_id: z.number().nullable(),
  vendor_id: z.number({ invalid_type_error: 'Vendor is required' }).min(1, 'Name is required'),
});

export const itemDefaultValues = {
  name: '',
  description: '',
  current_rate: null,
  unit_id: null,
  vendor_id: undefined,
};

export const itemsFilter = {
  name: '',
};
