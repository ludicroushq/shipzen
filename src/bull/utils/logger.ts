import { logger } from "@/logger";
import type { Job } from "bullmq";

export function getJobLogger(job: Job) {
  return logger.getSubLogger({
    name: `${job.queueName} - ${job.name}`,
    attachedTransports: [
      (logObj) => {
        void job.log(JSON.stringify(logObj));
      },
    ],
  });
}
