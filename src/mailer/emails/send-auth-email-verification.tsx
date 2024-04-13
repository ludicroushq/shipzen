import { CodeInline, Container, Section, Text } from '@react-email/components';
import type { EmailProps } from '..';
import { EmailWrapper } from './_components/email-wrapper';

type SendAuthEmailVerificationProps = {
  token: string;
} & EmailProps;

export function SendAuthEmailVerificationEmail(
  props: SendAuthEmailVerificationProps,
) {
  const { token } = props;
  return (
    <EmailWrapper {...props} previewText="Your auth code for SHIPZEN.">
      <Container>
        <Section>
          <Text className="mt-4 text-center text-2xl font-bold">
            Your Auth Code for SHIPZEN
          </Text>
        </Section>
        <Section className="rounded-lg border border-solid border-[#eaeaea] p-4">
          <Text className="text-lg">Hey there!</Text>
          <Text className="text-lg">Here is the auth code you requested:</Text>
          <Section className="rounded bg-gray-100 px-4 py-4 text-center text-xl">
            <CodeInline>{token}</CodeInline>
          </Section>
          <Text className="text-lg">
            Please enter the code on the website to finish signing in.
          </Text>
          <Text className="my-8 text-sm italic text-gray-600">
            If you did not request this, you may safely ignore this email.
          </Text>
        </Section>
      </Container>
    </EmailWrapper>
  );
}
SendAuthEmailVerificationEmail.PreviewProps = {
  token: '123456',
};
// eslint-disable-next-line import/no-default-export
export default SendAuthEmailVerificationEmail;
