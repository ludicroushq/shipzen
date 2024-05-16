"use server";
import { ActionError } from "@/app/_components/safe-action-error/action-error";
import { getAuth, getEnhancedDb } from "@/auth";
import { logger } from "@/logger";
import { dbAdmin } from "@/prisma";
import * as Sentry from "@sentry/nextjs";
import {
	DEFAULT_SERVER_ERROR,
	type SafeClientOpts,
	createSafeActionClient,
} from "next-safe-action";

const sharedActionClientOpts: Partial<SafeClientOpts<unknown, unknown>> = {
	handleReturnedServerError(e) {
		if (e instanceof ActionError) {
			return e.message;
		}

		return DEFAULT_SERVER_ERROR;
	},
	handleServerErrorLog(e) {
		Sentry.captureException(e);

		logger.error(e);
	},
};
export const actionClient = createSafeActionClient({
	...sharedActionClientOpts,
	async middleware() {
		const db = await getEnhancedDb();

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

		const db = await getEnhancedDb();

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

		const db = await getEnhancedDb();

		return { db, dbAdmin };
	},
});
