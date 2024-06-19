import { Inter } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import { Flash } from './_components/flash';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="h-full">
        {children}
        <Suspense>
          <Flash />
        </Suspense>
      </body>
    </html>
  );
}
