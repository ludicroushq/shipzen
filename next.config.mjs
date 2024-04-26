// @ts-check
import { withSentryConfig } from "@sentry/nextjs";
import cpx from "cpx2";
import { env } from "./src/config/env.mjs";

/**
 * Next.js and Tailwind do not support symbolic links
 * For now we use the `sync-directory` library to create links
 * @param {string} name - The name of the module to copy
 */
function syncModuleToApp(name) {
	cpx.copySync(`./src/${name}/app/**/*`, `./src/app/(shipzen)/(${name})`, {
		clean: true,
	});
}
syncModuleToApp("admin");
syncModuleToApp("auth");
syncModuleToApp("server");

/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	experimental: {
		serverComponentsExternalPackages: ["@zenstackhq/runtime"],
		swcPlugins: [
			[
				"next-superjson-plugin",
				{
					excluded: [],
				},
			],
		],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

export default withSentryConfig(
	nextConfig,
	{
		silent: true,
		org: env.SENTRY_ORG,
		project: env.SENTRY_PROJECT,
		url: env.SENTRY_URL,
	},
	{
		widenClientFileUpload: true,
		transpileClientSDK: true,
		tunnelRoute: "/monitoring",
		hideSourceMaps: true,
		disableLogger: true,
	},
);
