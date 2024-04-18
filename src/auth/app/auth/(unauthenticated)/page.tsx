import { CardBody, CardHeader } from '@nextui-org/react';
import { Auth } from './_components/auth';

// eslint-disable-next-line import/no-default-export
export default function Page() {
  return (
    <>
      <CardHeader className="prose prose-lg">
        <h1>Get Started</h1>
      </CardHeader>
      <CardBody>
        <Auth />
      </CardBody>
    </>
  );
}
