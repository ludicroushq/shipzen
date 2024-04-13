import { z } from 'zod';
import { publicProcedure } from '@/server/trpc';

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
