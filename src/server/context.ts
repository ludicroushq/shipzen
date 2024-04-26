import { getAuth, getEnhancedDb } from '@/auth';
import { dbAdmin } from '@/prisma';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import type { Session, User } from 'lucia';

export type Context = {
  db: typeof dbAdmin;
  dbAdmin: typeof dbAdmin;
  resHeaders: Headers | null;
} & ({ user: User; session: Session } | { user: null; session: null });

export async function createContext(
  opts?: Pick<FetchCreateContextFnOptions, 'req' | 'resHeaders'>,
): Promise<Context> {
  const auth = await getAuth();
  const db = await getEnhancedDb();

  const context = {
    db,
    dbAdmin,
    resHeaders: opts?.resHeaders ?? null,
  };

  if (!auth) {
    return {
      ...context,
      user: null,
      session: null,
    };
  }

  return {
    ...context,
    user: auth.user,
    session: auth.session,
  };
}
