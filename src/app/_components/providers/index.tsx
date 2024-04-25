'use client';

import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { isDev } from '@/config/node';
import {
  trpcReactQuery,
  trpcReactQueryClient,
} from '@/app/_utils/trpc/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError(error) {
        toast.error(error.message);
      },
    },
  },
});

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <trpcReactQuery.Provider
      client={trpcReactQueryClient}
      queryClient={queryClient}
    >
      <QueryClientProvider client={queryClient}>
        {/* eslint-disable-next-line @typescript-eslint/unbound-method -- works with nextui */}
        <NextUIProvider className="h-full" navigate={router.push}>
          {children}
        </NextUIProvider>
        {isDev ? <ReactQueryDevtools /> : null}
      </QueryClientProvider>
    </trpcReactQuery.Provider>
  );
}
