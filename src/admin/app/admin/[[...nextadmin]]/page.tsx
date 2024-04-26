import schema from "@/../prisma/json-schema/json-schema.json";
import { options } from "@/admin";
import { getEnhancedDb, verifyAdmin } from "@/auth";
import { NextAdmin } from "@premieroctet/next-admin";
import { getPropsFromParams } from "@premieroctet/next-admin/dist/appRouter";
import { notFound } from "next/navigation";
import { action, deleteAction, searchPaginatedResourceAction } from "./actions";

export default async function AdminPage({
	params,
	searchParams,
}: {
	params: Record<string, string[]>;
	searchParams: Record<string, string | string[] | undefined> | undefined;
}) {
	const { nextadmin } = params;
	const isAdmin = await verifyAdmin();
	if (!isAdmin) return notFound();

	const db = await getEnhancedDb();

	const props = await getPropsFromParams({
		params: nextadmin,
		searchParams,
		options,
		prisma: db,
		schema,
		action,
		deleteAction,
		searchPaginatedResourceAction,
	});

	return <NextAdmin {...props} />;
}
