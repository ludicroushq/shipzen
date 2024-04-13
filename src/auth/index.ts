import type { Session, User } from 'lucia';
import { Lucia, TimeSpan } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { UserRole, type User as DatabaseUser } from '@prisma/client';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { type AuthUser, enhance } from '@zenstackhq/runtime';
import { isProd } from '@/config/node';
import { dbAdmin } from '@/prisma';

const adapter = new PrismaAdapter(dbAdmin.authLuciaSession, dbAdmin.user);

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(90, 'd'),
  sessionCookie: {
    name: isProd ? '__Host-lucia-session' : 'lucia-session',
    expires: false,
    attributes: {
      secure: isProd,
    },
  },
  getUserAttributes: (attributes) => {
    const displayName = attributes.email
      ? attributes.email.split('@')[0]
      : 'Anonymous';
    return {
      ...attributes,
      displayName,
    };
  },
});

declare module 'lucia' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUser & {
      displayName: string;
    };
  }
}

export const auth = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    return lucia.validateSession(sessionId);
  },
);

export const authDb = cache(async () => {
  const { user } = await auth();

  const db = enhance(dbAdmin, {
    user: (user as unknown as AuthUser | null) ?? undefined,
  });

  return db;
});

export const authIsAdmin = cache(async () => {
  const { user } = await auth();

  if (user && user.role === UserRole.ADMIN) {
    return true;
  }

  return false;
});
