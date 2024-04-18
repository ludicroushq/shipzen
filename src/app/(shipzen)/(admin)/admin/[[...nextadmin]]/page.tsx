import { NextAdmin } from '@premieroctet/next-admin';
import { getPropsFromParams } from '@premieroctet/next-admin/dist/appRouter';
import { notFound } from 'next/navigation';
import { options } from '@/admin';
import { authDb, authIsAdmin } from '@/auth';
import schema from '@/../prisma/json-schema/json-schema.json';
import { action, deleteAction, searchPaginatedResourceAction } from './actions';

// eslint-disable-next-line import/no-default-export
export default async function AdminPage({
  params,
  searchParams,
}: {
  params: Record<string, string[]>;
  searchParams: Record<string, string | string[] | undefined> | undefined;
}) {
  const { nextadmin } = params;
  const isAdmin = await authIsAdmin();
  if (!isAdmin) return notFound();

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
