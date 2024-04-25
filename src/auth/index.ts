import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { UserRole, type User as DatabaseUser } from '@prisma/client';
import { enhance } from '@zenstackhq/runtime';
import type { Session, User } from 'lucia';
import { Lucia, TimeSpan } from 'lucia';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { dbAdmin } from '@/prisma';
import { isProd } from '@/config/node';

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

export const getAuth = cache(
  async (): Promise<{ user: User; session: Session } | null> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return null;
    }

    const auth = await lucia.validateSession(sessionId);
    if (!auth.session) return null;
    return auth;
  },
);

export const getEnhancedDb = cache(async () => {
  const auth = await getAuth();

  const db = enhance(dbAdmin, {
    user: auth?.user as DatabaseUser,
  });

  return db;
});

export const verifyAdmin = cache(async () => {
  const auth = await getAuth();

  if (auth?.user && auth.user.role === UserRole.ADMIN) {
    return true;
  }

  return false;
});
