import { env } from "@/config/env.js";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

export function getTransportOptions(): SMTPTransport.Options {
  const url = new URL(env.SMTP_URL);

  return {
    host: url.hostname,
    port: Number(url.port),
    auth: {
      user: decodeURIComponent(url.username),
      pass: decodeURIComponent(url.password),
    },
    from: url.searchParams.get("from") ?? undefined,
    replyTo: url.searchParams.get("replyTo") ?? undefined,
    secure: url.searchParams.get("secure") === "true" ?? undefined,
  };
}
