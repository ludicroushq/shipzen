import { redirect } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { Card } from '@nextui-org/react';
import { auth } from '@/auth';

// eslint-disable-next-line import/no-default-export
export default async function AuthenticatedLayout(props: PropsWithChildren) {
  const { children } = props;
  const { user } = await auth();
  if (user) redirect('/');

  return (
    <section className="container flex h-full flex-col justify-center">
      <Card className="mx-auto w-full max-w-md p-4">{children}</Card>
    </section>
  );
}