import type { Queue } from "bullmq";
import * as helloWorld from "./queues/hello-world";

type Bull = {
  name: string;
  queue: Queue;
};

export const Bull = {
  helloWorld,
} satisfies Record<string, Bull>;

// Bull.helloWorld.queue.add("hello-world", { name: "world" });
