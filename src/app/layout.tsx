import { Inter } from 'next/font/google';
import { twMerge } from 'tailwind-merge';
import { Providers } from './_components/providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// eslint-disable-next-line import/no-default-export
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full text-pretty" lang="en">
      <body className={twMerge(inter.className, 'h-full')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
