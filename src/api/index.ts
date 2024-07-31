import {Hono} from 'hono';

export const hono = new Hono().basePath('/api');
hono.onError((err) => {
	throw err;
});
