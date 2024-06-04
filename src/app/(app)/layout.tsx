import type { Metadata } from 'next';
import { auth } from '@/auth';
import { baseUrl } from '@/config/app';
import { Footer } from './_components/footer';
import { Navigation } from './_components/navigation';

export const metadata: Metadata = {
  title: 'TODO',
  description: 'TODO',
  metadataBase: new URL(baseUrl),
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <div className="flex h-full flex-col">
      <Navigation session={session} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
