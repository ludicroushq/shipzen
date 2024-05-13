import { sha256String } from "@/auth/hash";
import { sendEmail } from "@/mailer";
import { SendAuthEmailVerificationEmail } from "@/mailer/emails/send-auth-email-verification";
import { unauthenticatedProcedure } from "@/server/trpc";
import ms from "ms";
import { generateRandomInteger } from "oslo/crypto";
import { v4 } from "uuid";
import { z } from "zod";
import { AUTH_EMAIL_VERIFICATION_TOKEN_EXPIRES_IN_MINUTES } from "./constants";
import { authCreateInputSchema } from "./schema";

export const create = unauthenticatedProcedure
	.input(authCreateInputSchema)
	.output(
		z.object({
			code: z.string(),
		}),
	)
	.mutation(async ({ input, ctx }) => {
		const { dbAdmin } = ctx;
		const { email } = input;

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

		return { code };
	});
