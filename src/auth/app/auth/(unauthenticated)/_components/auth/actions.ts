"use server";

import { AUTH_EMAIL_VERIFICATION_TOKEN_EXPIRES_IN_MINUTES } from "@/auth/constants";
import { sha256String } from "@/auth/hash";
import { sendEmail } from "@/mailer";
import SendAuthEmailVerificationEmail from "@/mailer/emails/send-auth-email-verification";
import { unauthenticatedActionClient } from "@/server/safe-action";
import ms from "ms";
import { redirect } from "next/navigation";
import { generateRandomInteger } from "oslo/crypto";
import { v4 } from "uuid";
import { createAuthInputSchema } from "./schemas";

export const createAuthAction = unauthenticatedActionClient(
	createAuthInputSchema,
	async (data, { dbAdmin }) => {
		const { email } = data;

		const token = Array.from(Array(6))
			.map(() => generateRandomInteger(10))
			.join("");
		const tokenHash = await sha256String(token);
		const code = v4();
		const codeHash = await sha256String(code);

		await dbAdmin.authEmailVerification.create({
			data: {
				email,
				expiresAt: new Date(
					Date.now() +
						ms(`${AUTH_EMAIL_VERIFICATION_TOKEN_EXPIRES_IN_MINUTES}m`),
				),
				codeHash,
				tokenHash,
			},
		});

		await sendEmail(
			{
				subject: "Sign in to your TODO account",
				to: email,
			},
			SendAuthEmailVerificationEmail,
			{
				token,
			},
		);

		return redirect(`/auth/verify?code=${code}`);
	},
);
