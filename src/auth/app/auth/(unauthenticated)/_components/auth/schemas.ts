import { UserSchema } from "@zenstackhq/runtime/zod/models";
import { z } from "zod";

export const createAuthInputSchema = z.object({
	email: UserSchema.shape.email.min(1),
});
