import z from 'zod';

export const UnitSchema = z.object({
  name: z.string({ invalid_type_error: 'Name is required' }).min(1, 'Name is required'),
});

export const unitDefaultValues = {
  name: '',
};
