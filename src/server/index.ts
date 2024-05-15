import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { helloRouter } from "./routers/hello";
import { router, t } from "./trpc";

export const appRouter = router({
	hello: helloRouter,
});

export const createCaller = t.createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
