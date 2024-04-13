import * as Sentry from '@sentry/nextjs';
import { sentryBaseConfig } from './sentry.base.config';

Sentry.init({
  ...sentryBaseConfig,
  tracesSampleRate: 0,
  replaysOnErrorSampleRate: 0,
  replaysSessionSampleRate: 0,
});
