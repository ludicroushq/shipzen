import {type Job, type QueueOptions, Worker, type WorkerOptions} from 'bullmq';
import {deepmerge} from 'deepmerge-ts';
import {tasks} from '../tasks';
import {logger} from '@/logger';

export type Task = ((job: Job) => Promise<void>) & {
	queueOptions?: QueueOptions;
	workerOptions?: WorkerOptions;
};

export function createWorkers(options: WorkerOptions) {
	const workers: Record<string, Worker> = {};
	for (const key in tasks) {
		if (Object.hasOwn(tasks, key)) {
			const task = tasks[key as keyof typeof tasks] as Task;

			const worker = new Worker(
				key,
				task,
				deepmerge({
					...options,
					...task.workerOptions,
				}),
			);
			worker.on('error', (err) => {
				logger.error(err);
			});
			worker.on('failed', (job, err) => {
				logger.error(err);
			});
			workers[key] = worker;
		}
	}

	return workers as Record<keyof typeof tasks, Worker>;
}
