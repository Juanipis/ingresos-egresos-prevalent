import { PrismaClient } from '@prisma/client/edge'; // Asegúrate de usar el cliente Edge
import { withAccelerate } from '@prisma/extension-accelerate';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Crear un cliente Prisma Edge extendido con Accelerate
export const prisma =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

// Almacenar el cliente global solo en entornos no de producción
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
