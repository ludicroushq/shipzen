import { getAuth } from "@/auth";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export default async function AuthenticatedLayout(props: PropsWithChildren) {
	const { children } = props;
	const auth = await getAuth();
	if (!auth) redirect("/");

	return <>{children}</>;
}
