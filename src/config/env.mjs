// @ts-check

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    AUTH_SECRET: z.string().min(0),
    DATABASE_URL: z.string().url(),
    DATABASE_DIRECT_URL: z.string().url(),
    IS_STANDALONE: z
      .string()
      .optional()
      .transform((s) => s === "true"),
    SMTP_URL: z.string().url(),
  },
  client: {},
  experimental__runtimeEnv: {},
  emptyStringAsUndefined: true,
  skipValidation: Boolean(process.env.SKIP_ENV_VALIDATION) || Boolean(process.env.NEXT_PUBLIC_SKIP_ENV_VALIDATION),
});
