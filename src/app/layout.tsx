import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Providers } from "./_components/providers";
import "./globals.css";

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
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
