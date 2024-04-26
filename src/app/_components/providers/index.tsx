"use client";

import {
  trpcReactQuery,
  trpcReactQueryClient,
} from "@/app/_utils/trpc/react-query";
import { isDev } from "@/config/node";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { toast } from "sonner";

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
        <NextUIProvider className="h-full" navigate={router.push}>
          {children}
        </NextUIProvider>
        {isDev ? <ReactQueryDevtools /> : null}
      </QueryClientProvider>
    </trpcReactQuery.Provider>
  );
}
