import { z } from 'zod';
import { UserCreateSchema } from '@zenstackhq/runtime/zod/models';

export const authCreateInputSchema = z.object({
  email: UserCreateSchema.shape.email.min(1),
});
