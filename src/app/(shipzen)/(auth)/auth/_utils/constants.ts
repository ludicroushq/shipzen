import { isProd } from "@/config/node";

export const AUTH_VERIFICATION_CODE_COOKIE_NAME = isProd
	? "__Secure-auth-verification-code"
	: "auth-verification-code";
