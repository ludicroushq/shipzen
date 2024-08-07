import {NextAdmin} from '@premieroctet/next-admin';
import {getPropsFromParams} from '@premieroctet/next-admin/dist/appRouter';
import {notFound} from 'next/navigation';
import {action, deleteAction, searchPaginatedResourceAction} from './actions';
import {auth, authDb} from '@/auth';
import {options} from '@/admin';
import schema from '@/../prisma/json-schema/json-schema.json';

export default async function AdminPage({
	params,
	searchParams,
}: {
	params: Record<string, string[]>;
	searchParams: Record<string, string | string[] | undefined> | undefined;
}) {
	const {nextadmin} = params;
	const session = await auth();
	if (!session?.user.isAdmin) return notFound();

	const db = await authDb();

	const props = await getPropsFromParams({
		params: nextadmin,
		searchParams,
		options,
		prisma: db,
		schema,
		action,
		deleteAction,
		searchPaginatedResourceAction,
	});

	return <NextAdmin {...props} />;
}
