import { connection } from "@/bull/connection";
import { getJobLogger } from "@/bull/utils/logger";
import { Queue, Worker } from "bullmq";

export const name = "hello-world";

type Data = {
  name: string;
};

export const queue = new Queue<Data>(name, { connection });
export const worker = new Worker<Data>(
  queue.name,
  async (job) => {
    const logger = getJobLogger(job);

    logger.info(`Hello ${name}!`);
  },
  { connection },
);
