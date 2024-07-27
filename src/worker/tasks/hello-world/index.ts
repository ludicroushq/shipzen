import type { Job } from "bullmq";

type Data = {
  name: string;
};
export async function helloWorld(job: Job<Data>) {
  const { name } = job.data;
  job.log(`Hello ${name}!`);
}
