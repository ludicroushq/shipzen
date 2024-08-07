// @ts-check
import cpx from 'cpx2';
import './src/config/env.js'; // eslint-disable-line import/no-unassigned-import

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

syncModuleToApp('api');
syncModuleToApp('admin');
syncModuleToApp('auth');
syncModuleToApp('worker');

/** @type {import("next").NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		serverComponentsExternalPackages: ['@zenstackhq/runtime'],
		swcPlugins: [
			[
				'next-superjson-plugin',
				{
					excluded: [],
				},
			],
		],
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.gravatar.com',
				pathname: '/avatar/**',
			},
		],
	},
	webpack(config) {
		config.module = {
			...config.module,
			exprContextCritical: false,
		};
		return config;
	},
};

export default nextConfig;
