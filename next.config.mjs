import { withSentryConfig } from '@sentry/nextjs';
import cpx from 'cpx2';
import { env } from './src/config/env.mjs';

/**
 * Next.js and Tailwind do not support symbolic links
 * For now we use the `sync-directory` library to create links
 */
function syncFolder(source, target) {
  cpx.copySync(`${source}/**/*`, target, {
    clean: true,
  });
}
syncFolder('./src/admin/app', './src/app/(admin)');
syncFolder('./src/auth/app', './src/app/(auth)');
syncFolder('./src/server/app', './src/app/(server)');

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
