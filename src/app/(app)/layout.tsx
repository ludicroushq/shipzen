import type { Metadata } from 'next';
import { Suspense } from 'react';
import { auth } from '@/auth';
import { Footer } from './_components/footer';
import { Navigation } from './_components/navigation';
import { Toast } from './_components/toast';

export const metadata: Metadata = {
  title: 'SHIPZEN',
  description: 'SHIPZEN',
};

// eslint-disable-next-line import/no-default-export
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await auth();
  return (
    <div className="flex h-full flex-col">
      <Navigation user={user} />
      <main className="flex-grow">{children}</main>
      <Footer />
      <Suspense>
        <Toast />
      </Suspense>
    </div>
  );
}
