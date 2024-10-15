import { prisma } from '@/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Realizamos una consulta de prueba con estrategia de caché
    const users = await prisma.user.findMany({
      cacheStrategy: { ttl: 60 }, // Cachea los resultados por 60 segundos
    });

    // Devolvemos los resultados al cliente
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(
      'Error al realizar la consulta con Prisma Accelerate:',
      error
    );
    res.status(500).json({ success: false, error: error.message });
  }
}
