import { router } from "@/server/trpc";
import { create } from "./create";
import { destroy } from "./destroy";
import { verify } from "./verify";

export const authRouter = router({
	create,
	verify,
	destroy,
});
