// @ts-check

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		IS_STANDALONE: z
			.string()
			.optional()
			.transform((s) => s === "true"),
		SMTP_URL: z.string().url(),
	},
	client: {
		NEXT_PUBLIC_SENTRY_DSN: z.string().url(),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
	},
	emptyStringAsUndefined: true,
	skipValidation:
		Boolean(process.env.SKIP_ENV_VALIDATION) ||
		Boolean(process.env.NEXT_PUBLIC_SKIP_ENV_VALIDATION),
});
