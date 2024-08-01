/* eslint-disable unicorn/no-process-exit */
import process from 'process';
import {workerConnection} from './connection';
import {createWorkers} from './utils/create-workers';
import {logger} from '@/logger';
import {env} from '@/config/env.js';

async function start() {
	logger.info('Starting worker...');
	const workers = createWorkers({
		connection: workerConnection,
	});
	logger.info('Starting worker... Done');

	const gracefulShutdown = async (signal: 'SIGINT' | 'SIGTERM') => {
		logger.info(`Received ${signal}, closing server...`);

		await Promise.all(
			Object.values(workers).map(async (worker) => worker.close()),
		);

		process.exit(0);
	};

	process.on('SIGINT', async () => gracefulShutdown('SIGINT'));

	process.on('SIGTERM', async () => gracefulShutdown('SIGTERM'));

	process.on('uncaughtException', (err) => {
		logger.error(err, 'Uncaught exception');
	});

	process.on('unhandledRejection', (reason, promise) => {
		logger.error({promise, reason}, 'Unhandled Rejection at: Promise');
	});
}

if (env.REDIS_URL) {
	// eslint-disable-next-line unicorn/prefer-top-level-await
	start().catch((error) => {
		logger.error(error, 'Failed to start worker');
		process.exit(1);
	});
} else {
	logger.warn('Skipping worker start, no REDIS_URL provided');
	process.stdin.resume();
}
