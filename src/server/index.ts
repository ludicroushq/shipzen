import { auth, authDb } from "@/auth";
import { dbAdmin } from "@/prisma";
import { ZSAError, createServerActionProcedure } from "zsa";

export const procedure = createServerActionProcedure().handler(async () => {
  const db = await authDb();

  return { db, dbAdmin };
});

export const authenticatedProcedure = createServerActionProcedure(procedure).handler(async ({ ctx }) => {
  const session = await auth();
  if (!session) {
    throw new ZSAError("NOT_AUTHORIZED", "You must be signed in to access this resource");
  }

  return { ...ctx, auth: session };
});

export const unauthenticatedProcedure = createServerActionProcedure(procedure).handler(async ({ ctx }) => {
  const session = await auth();
  if (session) {
    throw new ZSAError("NOT_AUTHORIZED", "You are already signed in");
  }

  return ctx;
});
