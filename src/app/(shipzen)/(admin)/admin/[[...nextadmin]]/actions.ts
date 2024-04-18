'use server';
import { type ModelName, type ActionParams } from '@premieroctet/next-admin';
import {
  submitForm,
  deleteResourceItems,
  type SearchPaginatedResourceParams,
  searchPaginatedResource,
} from '@premieroctet/next-admin/dist/actions';
import { notFound } from 'next/navigation';
import { options } from '@/admin';
import { authDb, authIsAdmin } from '@/auth';

export const action = async (params: ActionParams, formData: FormData) => {
  const isAdmin = await authIsAdmin();
  if (!isAdmin) return notFound();

  const db = await authDb();
  return submitForm({ ...params, options, prisma: db }, formData);
};

export const deleteAction = async (
  model: ModelName,
  ids: string[] | number[],
) => {
  const isAdmin = await authIsAdmin();
  if (!isAdmin) return notFound();

  const db = await authDb();

  return deleteResourceItems(db, model, ids);
};

export const searchPaginatedResourceAction = async (
  actionParams: ActionParams,
  params: SearchPaginatedResourceParams,
) => {
  const isAdmin = await authIsAdmin();
  if (!isAdmin) return notFound();

  const db = await authDb();

  return searchPaginatedResource(
    { ...actionParams, options, prisma: db },
    params,
  );
};
