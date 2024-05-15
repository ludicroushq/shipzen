"use server";
import { getAuth, getEnhancedDb } from "@/auth";
import { logger } from "@/logger";
import { dbAdmin } from "@/prisma";
import * as Sentry from "@sentry/nextjs";
import { type SafeClientOpts, createSafeActionClient } from "next-safe-action";

const sharedActionClientOpts: Partial<SafeClientOpts<unknown, unknown>> = {
	handleServerErrorLog(e) {
		Sentry.captureException(e);

		logger.error(e);
	},
};
export const actionClient = createSafeActionClient({
	...sharedActionClientOpts,
	async middleware() {
		const db = getEnhancedDb();

		return { db, dbAdmin };
	},
});
export const authenticatedActionClient = createSafeActionClient({
	...sharedActionClientOpts,
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
	...sharedActionClientOpts,
	async middleware() {
		const auth = await getAuth();
		if (auth) {
			throw new Error("Unauthorized");
		}

		const db = getEnhancedDb();

		return { db, dbAdmin };
	},
});
