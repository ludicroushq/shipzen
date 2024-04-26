import { env } from '@/config/env.mjs';
import type * as Sentry from '@sentry/nextjs';

export const sentryBaseConfig:
  | Sentry.EdgeOptions
  | Sentry.NodeOptions
  | Sentry.BrowserOptions = {
  dsn: env.NEXT_PUBLIC_SENTRY_DSN,
  debug: false,
};
