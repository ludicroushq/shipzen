import {render} from '@react-email/components';
import {createTransport} from 'nodemailer';
import type {ComponentType} from 'react';
import {getTransportOptions} from './config';
import {logger} from '@/logger';

export const transporter = createTransport(getTransportOptions());

export type EmailProps = {
	subject: string;
	to: string;
};

export async function sendEmail<T>(
	opts: EmailProps,
	Component: ComponentType<T & EmailProps>,
	props: T,
) {
	const {subject, to} = opts;
	const fullProps = {...props, ...opts};
	const emailBody = render(<Component {...fullProps} />);
	const emailText = render(<Component {...fullProps} />, {
		plainText: true,
	});
	const email = await transporter.sendMail({
		to,
		subject,
		html: emailBody,
		text: emailText,
	});

	if (email.rejected.length > 0) {
		logger.error('Email rejected', email.rejected.join(', '));
	}
}
