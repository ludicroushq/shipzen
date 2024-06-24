// @ts-check
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

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: env.IS_STANDALONE ? "standalone" : undefined,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gravatar.com",
        pathname: "/avatar/**",
      },
    ],
  },
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
};

export default nextConfig;
