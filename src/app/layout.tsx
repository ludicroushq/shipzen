import { Inter, Inter_Tight as InterTight } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { twMerge } from "tailwind-merge";
import { Flash } from "./_components/flash";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const interTight = InterTight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={twMerge(inter.variable, interTight.variable, "h-full")}>
      <body className="h-full">
        {children}
        <Suspense>
          <Flash />
        </Suspense>
      </body>
    </html>
  );
}
