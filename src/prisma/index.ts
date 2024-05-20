import { PrismaClient } from "@prisma/client";
import { enhance } from "@zenstackhq/runtime";

const prismaClientSingleton = () => {
	return new PrismaClient();
};

// biome-ignore lint/suspicious/noShadowRestrictedNames: used for dev mode
declare const globalThis: {
	prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const _prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = _prisma;

export const dbAdmin = enhance(_prisma, undefined, { kinds: [] });
