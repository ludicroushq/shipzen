import {type Job, type QueueOptions, Worker, type WorkerOptions} from 'bullmq';
import {deepmerge} from 'deepmerge-ts';
import {tasks} from '../tasks';
import {logger} from '@/logger';

export type Task = ((job: Job) => Promise<void>) & {
	queueOptions?: QueueOptions;
	workerOptions?: WorkerOptions;
};

type Tasks = typeof tasks;
type Workers = {
	[key in keyof Tasks]: Worker<Parameters<Tasks[key]>[0]['data']>;
};
export function createWorkers(options: WorkerOptions) {
	const workers: Partial<Workers> = {};
	for (const key in tasks) {
		if (Object.hasOwn(tasks, key)) {
			const task = tasks[key as keyof Tasks] as Task;

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
			workers[key as keyof Workers] = worker;
		}
	}

	return workers as Workers;
}
