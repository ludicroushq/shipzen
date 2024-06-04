import { render } from '@react-email/components';
import * as Sentry from '@sentry/nextjs';
import { createTransport } from 'nodemailer';
import type { ComponentType } from 'react';
import { logger } from '@/logger';
import { from, replyTo, transport } from './config';

export const transporter = createTransport(transport);

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
