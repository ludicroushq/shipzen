import { isDev } from "@/config/node";
import { logger } from "@/logger";
import { appRouter } from "@/server";
import { createContext } from "@/server/context";
import * as Sentry from "@sentry/nextjs";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest, NextResponse } from "next/server";
import { verifyRequestOrigin } from "oslo/request";

function csrfCheck(request: NextRequest) {
  if (request.method === "GET") return;

  const originHeader = request.headers.get("Origin");
  const hostHeader = request.headers.get("Host");
  if (
    !originHeader ||
    !hostHeader ||
    !verifyRequestOrigin(originHeader, [hostHeader])
  ) {
    return new Response(null, {
      status: 403,
    });
  }
}

async function handler(request: NextRequest) {
  const csrfError = csrfCheck(request);
  if (csrfError) return csrfError;

  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext,
    onError({ path, error }) {
      if (isDev) {
        logger.error(
          `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
        );
      }

      if (error.code === "INTERNAL_SERVER_ERROR") {
        Sentry.captureException(error);
      }
    },
  });

  return response;
}

export { handler as GET, handler as POST };

export function OPTIONS(request: NextRequest) {
  const csrfError = csrfCheck(request);
  if (csrfError) return csrfError;

  const response = new NextResponse(null, {
    status: 204,
  });

  return response;
}
