import { Body, Head, Html, Preview, Tailwind } from '@react-email/components';
import type { ReactNode } from 'react';
import type { EmailProps } from '@/mailer';

type EmailWrapperProps = {
  children: ReactNode;
  previewText: string;
} & Pick<EmailProps, 'subject'>;

export function EmailWrapper(props: EmailWrapperProps) {
  const { children, previewText, subject } = props;
  return (
    <Html>
      <Tailwind>
        <Head>
          <title>{subject}</title>
        </Head>
        <Preview>{previewText}</Preview>
        <Body className="font-sans bg-white">{children}</Body>
      </Tailwind>
    </Html>
  );
}
