import {Worker, type WorkerOptions} from 'bullmq';
import {deepmerge} from 'deepmerge-ts';
import {type Task, tasks} from '../tasks';
import {logger} from '@/logger';

export function createWorkers(options: WorkerOptions) {
	const workers: Record<string, Worker> = {};
	for (const key in tasks) {
		if (Object.hasOwn(tasks, key)) {
			const task = tasks[key as keyof typeof tasks] as Task;

			const worker = new Worker(
				key,
				async (job) => {
					const originalLog = job.log;
					const originalClearLogs = job.clearLogs;
					let logCounter = 0;

					const subLogger = logger.getSubLogger({
						name: `${job.queueName} - ${job.name}`,
						attachedTransports: [
							(logObj) => {
								void originalLog(JSON.stringify(logObj));
							},
						],
					});

					job.log = async (message) => {
						subLogger.info(message);
						logCounter += 1;
						return logCounter;
					};

					job.clearLogs = async (keepLogs?: number | undefined) => {
						logCounter = 0;
						return originalClearLogs(keepLogs);
					};

					await task(job);
				},
				deepmerge({
					...options,
					...task.workerOptions,
				}),
			);
			worker.on('error', (err) => {
				logger.error(err);
			});
			workers[key] = worker;
		}
	}

	return workers as Record<keyof typeof tasks, Worker>;
}
