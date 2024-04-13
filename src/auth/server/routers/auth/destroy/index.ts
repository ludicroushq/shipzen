import { TRPCError } from '@trpc/server';
import { lucia } from '@/auth';
import { authenticatedProcedure } from '@/server/trpc';

export const destroy = authenticatedProcedure.mutation(async ({ ctx }) => {
  const { session, resHeaders } = ctx;

  if (!resHeaders)
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'No response headers for auth',
    });

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  resHeaders.append('Set-Cookie', sessionCookie.serialize());
});
