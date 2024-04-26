import { lucia } from "@/auth";
import { AUTH_VERIFICATION_CODE_COOKIE_NAME } from "@/auth/app/auth/_utils/constants";
import { sha256String } from "@/auth/hash";
import { unauthenticatedProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { serializeCookie } from "oslo/cookie";
import { authVerifyInputSchema } from "./schema";

export const verify = unauthenticatedProcedure
	.input(authVerifyInputSchema)
	.mutation(async ({ input, ctx }) => {
		const { dbAdmin, resHeaders } = ctx;
		const { token, code } = input;

		if (!resHeaders)
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "No response headers for auth",
			});

		const codeHash = await sha256String(code);
		const tokenHash = await sha256String(token);

		const authEmailVerification =
			await dbAdmin.authEmailVerification.findUnique({
				where: {
					codeHash_tokenHash: {
						codeHash,
						tokenHash,
					},
				},
			});

		if (!authEmailVerification)
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "Invalid verification code. Please try again.",
			});

		const { email, expiresAt, revokedAt } = authEmailVerification;

		if (revokedAt)
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "Invalid verification code. Please try again.",
			});

		if (expiresAt < new Date())
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "The verification code has expired. Please try again.",
			});

		const user = await dbAdmin.user.upsert({
			create: {
				email,
			},
			update: {},
			where: {
				email,
			},
		});

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		resHeaders.append("Set-Cookie", sessionCookie.serialize());

		const authVerificationCodeCookie = serializeCookie(
			AUTH_VERIFICATION_CODE_COOKIE_NAME,
			"",
			{
				expires: new Date(0),
				path: "/",
			},
		);
		resHeaders.append("Set-Cookie", authVerificationCodeCookie);
	});
