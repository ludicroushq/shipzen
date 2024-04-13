import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import type { Session, User } from 'lucia';
import { auth, authDb } from '@/auth';
import { dbAdmin } from '@/prisma';

export type Context = {
  db: typeof dbAdmin;
  dbAdmin: typeof dbAdmin;
  resHeaders: Headers | null;
} & ({ user: User; session: Session } | { user: null; session: null });

export async function createContext(
  opts?: Pick<FetchCreateContextFnOptions, 'req' | 'resHeaders'>,
): Promise<Context> {
  const { user, session } = await auth();
  const db = await authDb();

  const context = {
    db,
    dbAdmin,
    resHeaders: opts?.resHeaders ?? null,
  };

  if (!user) {
    return {
      ...context,
      user: null,
      session: null,
    };
  }

  return {
    ...context,
    user,
    session,
  };
}
