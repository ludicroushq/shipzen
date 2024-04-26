import { UserCreateSchema } from "@zenstackhq/runtime/zod/models";
import { z } from "zod";

export const authCreateInputSchema = z.object({
  email: UserCreateSchema.shape.email.min(1),
});
