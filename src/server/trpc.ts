import { TRPCError, initTRPC } from "@trpc/server";
import { SuperJSON } from "superjson";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import type { Context } from "./context";

export const t = initTRPC.context<Context>().create({
	transformer: SuperJSON,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			message:
				error.cause instanceof ZodError
					? fromZodError(error.cause).toString()
					: shape.message,
		};
	},
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const authenticatedProcedure = t.procedure.use(({ ctx, next }) => {
	const { user } = ctx;
	if (!user) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
		});
	}

	return next({
		ctx: {
			...ctx,
			user,
		},
	});
});
export const unauthenticatedProcedure = t.procedure.use(({ ctx, next }) => {
	const { user } = ctx;
	if (user) {
		throw new TRPCError({
			code: "BAD_REQUEST",
		});
	}

	return next({
		ctx: {
			...ctx,
			db: undefined,
			user,
		},
	});
});
