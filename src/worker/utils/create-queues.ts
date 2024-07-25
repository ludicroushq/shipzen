import { logger } from "@/logger";
import { Queue, type QueueOptions } from "bullmq";
import { deepmerge } from "deepmerge-ts";
import { type Task, tasks } from "../tasks";

export function createQueues(options: QueueOptions) {
  const queues: Record<string, Queue> = {};
  for (const key in tasks) {
    const task = tasks[key as keyof typeof tasks] as Task;
    const queue = new Queue(
      key,
      deepmerge({
        ...options,
        ...task.queueOptions,
      }),
    );
    queue.on("error", (err) => {
      logger.error(err);
    });
    queues[key] = queue;
  }

  return queues as Record<keyof typeof tasks, Queue>;
}
