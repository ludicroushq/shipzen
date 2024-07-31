import {createBullBoard} from '@bull-board/api';
import {BullMQAdapter} from '@bull-board/api/bullMQAdapter';
import {HonoAdapter} from '@bull-board/hono';
import {serveStatic} from '@hono/node-server/serve-static';
import {Hono} from 'hono';
import {handle} from 'hono/vercel';
import {notFound} from 'next/navigation';
import {queues} from '@/worker';
import {auth} from '@/auth';

const serverAdapter = new HonoAdapter(serveStatic);
serverAdapter.setBasePath('/admin/worker');

createBullBoard({
	queues: Object.values(queues).map((queue) => new BullMQAdapter(queue)),
	serverAdapter,
	options: {
		uiConfig: {
			miscLinks: [
				{
					text: 'Back to Admin',
					url: '/admin',
				},
			],
		},
	},
});

const app = new Hono();
app.onError((err) => {
	throw err;
});
app.use(async (_, next) => {
	const session = await auth();

	if (!session?.user.isAdmin) {
		return notFound();
	}

	return next();
});
app.route('/admin/worker', serverAdapter.registerPlugin());

export const GET = handle(app); // eslint-disable-line @typescript-eslint/naming-convention
export const POST = handle(app); // eslint-disable-line @typescript-eslint/naming-convention
export const PUT = handle(app); // eslint-disable-line @typescript-eslint/naming-convention
export const PATCH = handle(app); // eslint-disable-line @typescript-eslint/naming-convention
export const DELETE = handle(app); // eslint-disable-line @typescript-eslint/naming-convention
export const HEAD = handle(app); // eslint-disable-line @typescript-eslint/naming-convention
export const OPTIONS = handle(app); // eslint-disable-line @typescript-eslint/naming-convention
