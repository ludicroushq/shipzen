import type {Metadata} from 'next';
import {Footer} from './_components/footer';
import {Navigation} from './_components/navigation';
import {baseUrl} from '@/config/app';
import {auth} from '@/auth';

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
			<Navigation session={session ?? undefined} />
			<main className="flex-grow">{children}</main>
			<Footer />
		</div>
	);
}
