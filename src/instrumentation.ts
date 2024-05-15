import * as Sentry from "@sentry/nextjs";
import { sentryBaseConfig } from "../sentry.base.config";

export async function register() {
	if (process.env.NEXT_RUNTIME === "nodejs") {
		Sentry.init({
			...sentryBaseConfig,
			tracesSampleRate: 0,
		});
	}

	if (process.env.NEXT_RUNTIME === "edge") {
		Sentry.init({
			...sentryBaseConfig,
			tracesSampleRate: 0,
		});
	}
}
