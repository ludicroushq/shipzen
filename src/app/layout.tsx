import {
	Inter as interFont,
	Inter_Tight as interTightFont,
} from 'next/font/google';
import {Suspense} from 'react';
import {twMerge} from 'tailwind-merge';
import {Flash} from './_components/flash';
import './globals.css';

const inter = interFont({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
});

const interTight = interTightFont({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter-tight',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={twMerge(inter.variable, interTight.variable, 'h-full')}
		>
			<body className="h-full">
				{children}
				<Suspense>
					<Flash />
				</Suspense>
			</body>
		</html>
	);
}
