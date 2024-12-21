import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .min(6, { message: 'Password must be al least 6 characters long' }),
    role: z.enum(['admin', 'user']).optional(),
    isBlocked: z.boolean().optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
};
