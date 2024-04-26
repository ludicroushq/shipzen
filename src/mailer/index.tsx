import { env } from '@/config/env.mjs';
import { logger } from '@/logger';
import { render } from '@react-email/components';
import * as Sentry from '@sentry/nextjs';
import { createTransport } from 'nodemailer';
import type { ComponentType } from 'react';
import { z } from 'zod';

const decodedString = z.string().transform((v) => decodeURIComponent(v));
const schema = z.object({
  host: decodedString,
  port: z.coerce.number(),
  user: decodedString,
  pass: decodedString,
  from: decodedString,
  replyTo: decodedString.nullable(),
  secure: z
    .enum(['true', 'false'])
    .default('false')
    .nullable()
    .transform((v) => v === 'true'),
});

const url = new URL(env.SMTP_URL);

const { host, port, user, pass, from, replyTo, secure } = schema.parse({
  host: url.hostname,
  port: url.port,
  user: url.username,
  pass: url.password,
  from: url.searchParams.get('from'),
  replyTo: url.searchParams.get('replyTo'),
  secure: url.searchParams.get('secure'),
});

export const transporter = createTransport({
  host,
  port,
  secure,
  auth: {
    user,
    pass,
  },
});

export type EmailProps = {
  subject: string;
  to: string;
};

export async function sendEmail<T>(
  opts: EmailProps,
  Component: ComponentType<T & EmailProps>,
  props: T,
) {
  const { subject, to } = opts;
  const fullProps = { ...props, ...opts };
  const emailBody = render(<Component {...fullProps} />);
  const emailText = render(<Component {...fullProps} />, {
    plainText: true,
  });
  const email = await transporter.sendMail({
    from,
    replyTo: replyTo ?? undefined,
    to,
    subject,
    html: emailBody,
    text: emailText,
  });

  if (email.rejected.length > 0) {
    Sentry.captureMessage(`Email rejected: ${email.rejected.join(', ')}`);
    logger.error('Email rejected', email.rejected.join(', '));
  }
}
