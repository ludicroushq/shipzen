import type { Job, QueueOptions } from "bullmq";
import { helloWorld } from "./hello-world";

export type Task = ((job: Job) => Promise<void> | void) & {
  queueOptions?: QueueOptions;
  workerOptions?: WorkerOptions;
};

export const tasks = {
  helloWorld,
} satisfies Record<string, Task>;
