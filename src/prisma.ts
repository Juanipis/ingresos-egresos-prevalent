import { PrismaClient } from '@prisma/client/edge'; // Edge version
import { withAccelerate } from '@prisma/extension-accelerate';

// Define the type for the extended Prisma client
type ExtendedPrismaClient = ReturnType<PrismaClient['$extends']>;

// Define the global object
// eslint-disable-next-line no-undef
const globalForPrisma = globalThis as unknown as {
  prisma: ExtendedPrismaClient | undefined;
};

// Create the extended Prisma client with Accelerate
export const prisma =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

// Store the client globally only in non-production environments
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
