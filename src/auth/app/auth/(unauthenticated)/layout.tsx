import { getAuth } from "@/auth";
import { Card } from "@nextui-org/react";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export default async function AuthenticatedLayout(props: PropsWithChildren) {
	const { children } = props;
	const auth = await getAuth();
	if (auth) redirect("/");

	return (
		<section className="container flex h-full flex-col justify-center">
			<Card className="mx-auto w-full max-w-md p-4">{children}</Card>
		</section>
	);
}
