import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import "./globals.css";
import { Suspense } from "react";
import { Toast } from "./_components/toast";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={twMerge(inter.variable, "h-full text-pretty")}>
			<body className="h-full">
				{children}
				<Suspense>
					<Toast />
				</Suspense>
			</body>
		</html>
	);
}
