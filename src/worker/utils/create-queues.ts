import {Queue, type QueueOptions} from 'bullmq';
import {deepmerge} from 'deepmerge-ts';
import {tasks} from '../tasks';
import {type Task} from './create-workers';
import {logger} from '@/logger';

type Tasks = typeof tasks;
type Queues = {
	[key in keyof Tasks]: Queue<Parameters<Tasks[key]>[0]['data']>;
};
export function createQueues(options: QueueOptions) {
	const queues: Partial<Queues> = {};
	for (const key in tasks) {
		if (Object.hasOwn(tasks, key)) {
			const task = tasks[key as keyof Tasks] as Task;
			const queue = new Queue(
				key,
				deepmerge({
					...options,
					...task.queueOptions,
				}),
			);
			queue.on('error', (err) => {
				logger.error(err);
			});
			queues[key as keyof Queues] = queue;
		}
	}

	return queues as Queues;
}
