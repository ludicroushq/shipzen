import { AuthEmailVerificationCreateSchema } from "@zenstackhq/runtime/zod/models";
import { z } from "zod";

export const authVerifyInputSchema = z.object({
	code: AuthEmailVerificationCreateSchema.shape.codeHash.min(1),
	token: AuthEmailVerificationCreateSchema.shape.codeHash.min(1),
});
