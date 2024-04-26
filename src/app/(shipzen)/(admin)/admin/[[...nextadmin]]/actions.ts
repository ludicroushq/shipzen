'use server';
import { options } from '@/admin';
import { getEnhancedDb, verifyAdmin } from '@/auth';
import type { ActionParams, ModelName } from '@premieroctet/next-admin';
import {
  type SearchPaginatedResourceParams,
  deleteResourceItems,
  searchPaginatedResource,
  submitForm,
} from '@premieroctet/next-admin/dist/actions';
import { notFound } from 'next/navigation';

export const action = async (params: ActionParams, formData: FormData) => {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) return notFound();

  const db = await getEnhancedDb();
  return submitForm({ ...params, options, prisma: db }, formData);
};

export const deleteAction = async (
  model: ModelName,
  ids: string[] | number[],
) => {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) return notFound();

  const db = await getEnhancedDb();

  return deleteResourceItems(db, model, ids);
};

export const searchPaginatedResourceAction = async (
  actionParams: ActionParams,
  params: SearchPaginatedResourceParams,
) => {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) return notFound();

  const db = await getEnhancedDb();

  return searchPaginatedResource(
    { ...actionParams, options, prisma: db },
    params,
  );
};
