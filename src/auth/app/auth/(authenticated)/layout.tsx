import { redirect } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { auth } from '@/auth';

// eslint-disable-next-line import/no-default-export
export default async function AuthenticatedLayout(props: PropsWithChildren) {
  const { children } = props;
  const { user } = await auth();
  if (!user) redirect('/');

  return <>{children}</>;
}
