//site https://www.prisma.io/docs/concepts/components/prisma-client

import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Prevent multiple instances of Prisma Client in development
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();
 // log de consultas prisma
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;

