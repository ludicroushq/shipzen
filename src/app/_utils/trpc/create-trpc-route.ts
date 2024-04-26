import { createCaller } from "@/server";
import { createContext } from "@/server/context";
import type { NextResponse } from "next/server";

export async function createTRPCRoute(
  request: Request | NextResponse,
  headers: Headers,
) {
  const context = await createContext({
    resHeaders: headers,
    req: request as Request,
  });
  const caller = createCaller(context);

  return caller;
}
