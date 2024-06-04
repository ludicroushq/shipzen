import type { EmailProps } from '..';
import { EmailWrapper } from './_components/email-wrapper';

type HelloWorldProps = {
  name: string;
} & EmailProps;

export function HelloWorld(props: HelloWorldProps) {
  const { name } = props;
  return (
    <EmailWrapper {...props} previewText={`Hello ${name}!`}>
      <h1>Hello {name}!</h1>
    </EmailWrapper>
  );
}
HelloWorld.PreviewProps = {
  name: 'ShipZen',
};
export default HelloWorld;
