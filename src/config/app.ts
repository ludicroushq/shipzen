import { isDev } from "./node";

export const rootDomain = "TODO.com";
export const baseDomain = (() => {
	if (isDev) return "localhost:3000";
	// TODO: remove the www. if you don't plan on using it
	return `www.${rootDomain}`;
})();
export const baseUrl = (() => {
	if (isDev) return `http://${baseDomain}`;
	return `https://${baseDomain}`;
})();
