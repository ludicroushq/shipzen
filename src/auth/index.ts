import {PrismaAdapter as prismaAdapter} from '@auth/prisma-adapter';
import {type User, UserRole} from '@prisma/client';
import {enhance} from '@zenstackhq/runtime';
import nextAuth from 'next-auth';
import nodemailer from 'next-auth/providers/nodemailer';
import {cache} from 'react';
import {_prisma} from '@/prisma';
import {getTransportOptions} from '@/mailer/config';

declare module 'next-auth' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Session {
		user: User & {
			displayName: string;
			isAdmin: boolean;
		};
	}
}

export const {handlers, signIn, signOut, auth} = nextAuth({
	adapter: prismaAdapter(_prisma),
	trustHost: true,
	theme: {
		brandColor: '#000000',
		buttonText: '#ffffff',
		colorScheme: 'light',
	},
	providers: [
		nodemailer({
			id: 'email',
			name: 'Email',
			server: getTransportOptions(),
		}),
	],
	callbacks: {
		session({session}) {
			const isAdmin = session.user.role === UserRole.ADMIN;
			const displayName = session.user.email.split('@')[0];

			return {
				...session,
				user: {
					...session.user,
					displayName,
					isAdmin,
				},
			};
		},
	},
});

export const authDb = cache(async () => {
	const session = await auth();

	const db = enhance(_prisma, {
		user: session?.user ?? undefined,
	});

	return db;
});
