import { loggerLink as loggerLinkTRPC } from "@trpc/client";
import { SuperJSON } from "superjson";

export const transformer = SuperJSON;
export const loggerLink = loggerLinkTRPC({
  enabled: (op) =>
    process.env.NODE_ENV === "development" ||
    (op.direction === "down" && op.result instanceof Error),
});
