import type * as Sentry from '@sentry/nextjs';
import { env } from '@/config/env.mjs';

export const sentryBaseConfig:
  | Sentry.EdgeOptions
  | Sentry.NodeOptions
  | Sentry.BrowserOptions = {
  dsn: env.NEXT_PUBLIC_SENTRY_DSN,
  debug: false,
};
