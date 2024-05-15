"use server";

import { lucia } from "@/auth";
import { sha256String } from "@/auth/hash";
import { unauthenticatedActionClient } from "@/server/safe-action";
import { cookies } from "next/headers";
import { verifyAuthInputSchema } from "./schemas";

export const verifyAuthAction = unauthenticatedActionClient(
	verifyAuthInputSchema,
	async (data, { dbAdmin }) => {
		const { token, code } = data;

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
			throw new Error("Invalid verification code. Please try again.");

		const { email, expiresAt, revokedAt } = authEmailVerification;

		if (revokedAt)
			throw new Error("Invalid verification code. Please try again.");

		if (expiresAt < new Date())
			throw new Error("The verification code has expired. Please try again.");

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
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);
	},
);
