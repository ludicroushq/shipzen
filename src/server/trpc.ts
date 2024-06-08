import { initTRPC, TRPCError } from '@trpc/server';
// eslint-disable-next-line camelcase -- from trpc
import { experimental_nextAppDirCaller } from '@trpc/server/adapters/next-app-dir';
import { auth, authDb } from '@/auth';
import { dbAdmin } from '@/prisma';

type Meta = {
  span: string;
};

export const t = initTRPC.meta<Meta>().create();

export const procedure = t.procedure
  .experimental_caller(
    experimental_nextAppDirCaller({
      pathExtractor: ({ meta }) => (meta as Meta).span,
    }),
  )
  .use(async (opts) => {
    const db = await authDb();

    return opts.next({
      ctx: {
        ...opts.ctx,
        db,
        dbAdmin,
      },
    });
  });

export const authenticatedProcedure = procedure.use(async (opts) => {
  const session = await auth();
  if (!session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }

  return opts.next({
    ctx: {
      ...opts.ctx,
      session,
    },
  });
});

export const unauthenticatedProcedure = procedure.use(async (opts) => {
  const session = await auth();
  if (session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You are already signed in',
    });
  }

  return opts.next({
    ctx: {
      ...opts.ctx,
    },
  });
});
