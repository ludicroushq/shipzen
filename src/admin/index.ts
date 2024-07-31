import type {NextAdminOptions} from '@premieroctet/next-admin';

export const options: NextAdminOptions = {
	basePath: '/admin',
	forceColorScheme: 'light',
	pages: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'/worker': {
			title: 'Worker',
		},
	},
};
