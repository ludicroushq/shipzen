'use server';
import { type ModelName, type ActionParams } from '@premieroctet/next-admin';
import {
  submitForm,
  deleteResourceItems,
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
