'use client';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server';
import { baseUrl } from '@/config/app';
import { loggerLink, transformer } from './shared';

const links = [
  httpBatchLink({
    url: `${baseUrl}/api/trpc`,
    transformer,
  }),
  loggerLink,
];

export const trpcReactQuery = createTRPCReact<AppRouter>();
export const trpcReactQueryClient = trpcReactQuery.createClient({
  links,
});
