"use server";
import { getAuth, getEnhancedDb } from "@/auth";
import { dbAdmin } from "@/prisma";
import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
	async middleware() {
		const db = getEnhancedDb();

		return { db, dbAdmin };
	},
});
export const authenticatedActionClient = createSafeActionClient({
	async middleware() {
		const auth = await getAuth();
		if (!auth) {
			throw new Error("Unauthorized");
		}

		const db = getEnhancedDb();

		return { auth, db, dbAdmin };
	},
});
export const unauthenticatedActionClient = createSafeActionClient({
	async middleware() {
		const auth = await getAuth();
		if (auth) {
			throw new Error("Unauthorized");
		}

		const db = getEnhancedDb();

		return { db, dbAdmin };
	},
});
