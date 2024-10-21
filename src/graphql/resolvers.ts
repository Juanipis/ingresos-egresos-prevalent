import { prisma } from '@/prisma';

interface GraphQLContext {
  session: {
    user: {
      email: string;
      role: string;
    };
  };
}

interface MoneyMovementFilters {
  user?: { email: string };
  date?: { gte?: Date; lte?: Date };
}

export const resolvers = {
  Query: {
    users: async () => {
      return prisma.user.findMany({});
    },
    user: async (_: unknown, args: { id: string }) => {
      return prisma.user.findUnique({
        where: { id: args.id },
        include: { moneyMovements: true },
      });
    },
    moneyMovements: async (
      _: unknown,
      args: {
        email?: string;
        startDate?: string;
        endDate?: string;
        limit?: number;
        offset?: number;
      }
    ) => {
      const filters: MoneyMovementFilters = {};

      if (args.email) {
        filters.user = { email: args.email };
      }

      if (args.startDate || args.endDate) {
        filters.date = {};
        if (args.startDate) {
          filters.date.gte = new Date(args.startDate); // Fecha de inicio
        }
        if (args.endDate) {
          filters.date.lte = new Date(args.endDate); // Fecha de fin
        }
      }

      // Paginación

      const skip = args.offset || 0; // Desplazamiento
      if (args.limit) {
        return prisma.moneyMovement.findMany({
          where: filters,
          take: args.limit,
          skip: skip,
          orderBy: { date: 'desc' }, // Ordenar por fecha descendente
        });
      } else {
        return prisma.moneyMovement.findMany({
          where: filters,
          orderBy: { date: 'desc' }, // Ordenar por fecha descendente
        });
      }
    },
    moneyMovement: async (_: unknown, args: { id: string }) => {
      return prisma.moneyMovement.findUnique({
        where: { id: args.id },
        include: { user: true },
      });
    },
  },
  Mutation: {
    createMoneyMovement: async (
      _: unknown,
      {
        amount,
        concept,
        date,
      }: { amount: number; concept: string; date: string },
      context: GraphQLContext
    ) => {
      const user = await prisma.user.findUnique({
        where: { email: context.session.user.email },
      });

      if (!user) throw new Error('User not found');

      const parsedDate = date ? new Date(date) : new Date();

      return prisma.moneyMovement.create({
        data: {
          userId: user.id,
          amount,
          concept,
          date: parsedDate,
        },
      });
    },
    updateMoneyMovement: async (
      _: unknown,
      { id, amount, concept }: { id: string; amount?: number; concept?: string }
    ) => {
      return prisma.moneyMovement.update({
        where: { id },
        data: { amount, concept },
      });
    },
    deleteMoneyMovement: async (_: unknown, { id }: { id: string }) => {
      await prisma.moneyMovement.delete({ where: { id } });
      return true;
    },
  },
  MoneyMovement: {
    user: async (parent: { userId: string }) => {
      return prisma.user.findUnique({ where: { id: parent.userId } });
    },
  },
};
