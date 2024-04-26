import { publicProcedure } from '@/server/trpc';
import { z } from 'zod';

export const world = publicProcedure
  .output(
    z.object({
      message: z.string(),
    }),
  )
  .query(() => {
    return {
      message: 'Hello, World!',
    };
  });
