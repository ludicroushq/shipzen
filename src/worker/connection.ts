import IORedis from 'ioredis';
import {env} from '@/config/env.js';

export const queueConnection = new IORedis(env.REDIS_URL ?? '', {
	enableReadyCheck: false,
	lazyConnect: true,
	maxRetriesPerRequest: 1,
	retryStrategy: () => null,
	enableOfflineQueue: false,
});

export const workerConnection = new IORedis(env.REDIS_URL ?? '', {
	enableReadyCheck: false,
	lazyConnect: true,
	maxRetriesPerRequest: null,
});
