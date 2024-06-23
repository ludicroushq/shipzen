import { from, transport } from "@/mailer/config";
import { _prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type User, UserRole } from "@prisma/client";
import { enhance } from "@zenstackhq/runtime";
import NextAuth from "next-auth";
import Nodemailer from "next-auth/providers/nodemailer";
import { cache } from "react";

declare module "next-auth" {
  interface Session {
    user: User & {
      displayName: string;
      isAdmin: boolean;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(_prisma),
  trustHost: true,
  theme: {
    brandColor: "#000000",
    buttonText: "#ffffff",
    colorScheme: "light",
  },
  providers: [
    Nodemailer({
      id: "email",
      name: "Email",
      server: transport,
      from,
    }),
  ],
  callbacks: {
    session({ session }) {
      const isAdmin = session.user.role === UserRole.ADMIN;
      const displayName = session.user.email.split("@")[0];

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
    user: session?.user ? session.user : undefined,
  });

  return db;
});
