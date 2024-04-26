import { AuthEmailVerificationSchema } from '@zenstackhq/runtime/zod/models';
import { z } from 'zod';

export const authVerifyInputSchema = z.object({
  code: AuthEmailVerificationSchema.shape.codeHash.min(1),
  token: AuthEmailVerificationSchema.shape.codeHash.min(1),
});
