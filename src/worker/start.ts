import { env } from "@/config/env.mjs";
import { logger } from "@/logger";
import { workerConnection } from "./connection";
import { createWorkers } from "./utils/create-workers";

async function start() {
  logger.info("Starting worker...");
  const workers = createWorkers({
    connection: workerConnection,
  });
  logger.info("Starting worker... Done");

  const gracefulShutdown = async (signal: "SIGINT" | "SIGTERM") => {
    logger.info(`Received ${signal}, closing server...`);

    for (const worker of Object.values(workers)) {
      await worker.close();
    }

    process.exit(0);
  };

  process.on("SIGINT", () => gracefulShutdown("SIGINT"));

  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

  process.on("uncaughtException", (err) => {
    logger.error(err, "Uncaught exception");
  });

  process.on("unhandledRejection", (reason, promise) => {
    logger.error({ promise, reason }, "Unhandled Rejection at: Promise");
  });
}

if (env.REDIS_URL) {
  start().catch((err) => {
    logger.error(err, "Failed to start worker");
    process.exit(1);
  });
} else {
  logger.warn("Skipping worker start, no REDIS_URL provided");
  process.stdin.resume();
}
