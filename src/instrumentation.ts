import { env } from "./config/env.mjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    if (env.REDIS_URL) {
      await import("./bull/index");
    }
  }
}
