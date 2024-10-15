import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

// Crear el cliente Prisma y extenderlo con Accelerate
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Usar el cliente global o crear uno nuevo extendido con Accelerate
export const prisma =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

// Almacenar el cliente global solo en entornos no de producción
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
