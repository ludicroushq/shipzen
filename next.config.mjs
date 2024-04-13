import { withSentryConfig } from '@sentry/nextjs';
import { env } from './src/config/env.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  experimental: {
    serverComponentsExternalPackages: ['@zenstackhq/runtime'],
    swcPlugins: [
      [
        'next-superjson-plugin',
        {
          excluded: [],
        },
      ],
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

// eslint-disable-next-line import/no-default-export
export default withSentryConfig(
  nextConfig,
  {
    silent: true,
    org: env.SENTRY_ORG,
    project: env.SENTRY_PROJECT,
    url: env.SENTRY_URL,
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
  },
);
