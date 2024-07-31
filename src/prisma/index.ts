import {PrismaClient} from '@prisma/client';
import {enhance} from '@zenstackhq/runtime';
import {isDev} from '@/config/node';

const prismaClientSingleton = () => {
	return new PrismaClient();
};

declare const globalThis: {
	prismaGlobal?: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const _prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
if (isDev) globalThis.prismaGlobal = _prisma;

export const dbAdmin = enhance(_prisma, undefined, {kinds: []});
