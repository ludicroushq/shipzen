import { redirect } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { getAuth } from '@/auth';

// eslint-disable-next-line import/no-default-export
export default async function AuthenticatedLayout(props: PropsWithChildren) {
  const { children } = props;
  const auth = await getAuth();
  if (!auth) redirect('/');

  return <>{children}</>;
}
