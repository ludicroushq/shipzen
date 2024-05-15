import type { EmailProps } from "..";
import { EmailWrapper } from "./_components/email-wrapper";

type SendAuthEmailVerificationProps = {
	token: string;
} & EmailProps;

export function SendAuthEmailVerificationEmail(
	props: SendAuthEmailVerificationProps,
) {
	const { token } = props;
	return (
		<EmailWrapper {...props} previewText="Your auth code for TODO.">
			<p>Hey there!</p>
			<p>
				Here is the auth code you requested for TODO: <b>{token}</b>
			</p>
			<p>
				Please enter the code on the website to finish signing in. If you did
				not request this, you may safely ignore this email.
			</p>
			<p>
				Thanks,
				<br />
				The TODO Team
			</p>
		</EmailWrapper>
	);
}
SendAuthEmailVerificationEmail.PreviewProps = {
	token: "123456",
};
export default SendAuthEmailVerificationEmail;
