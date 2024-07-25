import type { Job } from "bullmq";

export async function helloWorld(job: Job<{ name: string }>) {
  const { name } = job.data;
  job.log(`Hello ${name}!`);
}
