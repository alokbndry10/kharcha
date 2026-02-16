import z from 'zod';

export const loginDefaultValues = {
  email: 'lokesh.bajracharya5@gmail.com',
  password: '5Z@y.dSXatTgn5h',
};

export const loginSchema = z.object({
  email: z.string({ required_error: 'Email is required.' }).email('Please enter a valid email.'),
  password: z.string({ required_error: 'Password is required.' }),
});
