import { env } from "@/config/env.mjs";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { z } from "zod";

const decodedString = z.string().transform((v) => decodeURIComponent(v));
const schema = z.object({
  host: decodedString,
  port: z.coerce.number(),
  user: decodedString,
  pass: decodedString,
  from: decodedString,
  replyTo: decodedString.nullable(),
  secure: z
    .enum(["true", "false"])
    .default("false")
    .nullable()
    .transform((v) => v === "true"),
});

const url = new URL(env.SMTP_URL);

const { host, port, user, pass, from, replyTo, secure } = schema.parse({
  host: url.hostname,
  port: url.port,
  user: url.username,
  pass: url.password,
  from: url.searchParams.get("from"),
  replyTo: url.searchParams.get("replyTo"),
  secure: url.searchParams.get("secure"),
});

export { from, replyTo };

export const transport: SMTPTransport.Options = {
  host,
  port,
  secure,
  auth: {
    user,
    pass,
  },
};
