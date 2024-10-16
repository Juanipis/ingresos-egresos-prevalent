import { PrismaClient } from '@prisma/client/edge'; // Edge version of Prisma
import { withAccelerate } from '@prisma/extension-accelerate';

// Create a new instance of PrismaClient with the Accelerate extension
const prismaClient = new PrismaClient().$extends(withAccelerate());

// Explicitly cast the extended Prisma client to the PrismaClient type
// eslint-disable-next-line no-undef, @typescript-eslint/no-explicit-any
export const prisma = (globalThis as any).prisma || prismaClient;

// Cache the Prisma client globally to prevent it from being re-initialized in development
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line no-undef, @typescript-eslint/no-explicit-any
  (globalThis as any).prisma = prisma;
}
