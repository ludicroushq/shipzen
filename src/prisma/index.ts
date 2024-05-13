import { PrismaClient } from '@prisma/client';
import { enhance } from '@zenstackhq/runtime';

export const _prisma = new PrismaClient();

export const dbAdmin = enhance(_prisma, undefined, { kinds: [] });
