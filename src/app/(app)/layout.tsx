import { getAuth } from "@/auth";
import type { Metadata } from "next";
import { Footer } from "./_components/footer";
import { Navigation } from "./_components/navigation";

export const metadata: Metadata = {
	title: "TODO",
	description: "TODO",
};

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const auth = await getAuth();
	return (
		<div className="flex h-full flex-col">
			<Navigation user={auth?.user} />
			<main className="flex-grow">{children}</main>
			<Footer />
		</div>
	);
}
