import { env } from "@/config/env.mjs";
import IORedis from "ioredis";

export const connection = new IORedis(env.REDIS_URL ?? "", {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});
