'use server';
import * as Sentry from '@sentry/nextjs';
import {
  DEFAULT_SERVER_ERROR,
  type SafeClientOpts,
  createSafeActionClient,
} from 'next-safe-action';
import { ActionError } from '@/app/_components/safe-action-error/action-error';
import { auth, authDb } from '@/auth';
import { logger } from '@/logger';
import { dbAdmin } from '@/prisma';

const sharedActionClientOpts: Partial<SafeClientOpts<unknown, unknown>> = {
  handleReturnedServerError(e) {
    if (e instanceof ActionError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR;
  },
  handleServerErrorLog(e) {
    Sentry.captureException(e);

    logger.error(e);
  },
};
export const actionClient = createSafeActionClient({
  ...sharedActionClientOpts,
  async middleware() {
    const db = await authDb();

    return { db, dbAdmin };
  },
});
export const authenticatedActionClient = createSafeActionClient({
  ...sharedActionClientOpts,
  async middleware() {
    const session = await auth();
    if (!session) {
      throw new Error('Unauthorized');
    }

    const db = await authDb();

    return { auth: session, db, dbAdmin };
  },
});
export const unauthenticatedActionClient = createSafeActionClient({
  ...sharedActionClientOpts,
  async middleware() {
    const session = await auth();
    if (session) {
      throw new Error('Unauthorized');
    }

    const db = await authDb();

    return { db, dbAdmin };
  },
});
