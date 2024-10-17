import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { prisma } from '@/prisma';
import { auth } from '@/auth';

interface GraphQLContext {
  session: {
    user: {
      email: string;
      role: string;
    };
  };
}

const resolvers = {
  Query: {
    users: async () => {
      return prisma.user.findMany({});
    },
    user: async (_: any, args: { id: string }, context: GraphQLContext) => {
      return prisma.user.findUnique({
        where: { id: args.id },
        include: {
          moneyMovements: true,
        },
      });
    },
    moneyMovements: async (
      _: any,
      args: { email?: string },
      context: GraphQLContext
    ) => {
      // si el email no está presente, se obtienen todos los movimientos
      if (!args.email) {
        return prisma.moneyMovement.findMany({});
      }
      return prisma.moneyMovement.findMany({});
    },
    moneyMovement: async (_: any, args: { id: string }) => {
      return prisma.moneyMovement.findUnique({
        where: { id: args.id },
        include: {
          user: true,
        },
      });
    },
  },
  Mutation: {
    createMoneyMovement: async (
      _: any,
      {
        amount,
        concept,
        date,
      }: { amount: number; concept: string; date: string },
      context: GraphQLContext
    ) => {
      console.log('Recived params: ', amount, concept, date);
      // Consultar el userId solo cuando es necesario
      const user = await prisma.user.findUnique({
        where: { email: context.session.user.email },
      });

      if (!user) {
        throw new Error('User not found');
      }

      // convertir el string de fecha a un objeto Date
      const parsedDate = date ? new Date(date) : new Date();

      return prisma.moneyMovement.create({
        data: {
          userId: user.id, // Relacionar el movimiento con el usuario autenticado
          amount,
          concept,
          date: parsedDate, // Cambiado de `parsedDate` a `date` para Prisma
        },
      });
    },

    updateMoneyMovement: async (
      _: any,
      {
        id,
        amount,
        concept,
      }: { id: string; amount?: number; concept?: string },
      context: GraphQLContext
    ) => {
      // En este caso no necesitamos obtener el userId porque estamos actualizando por id de movimiento
      return prisma.moneyMovement.update({
        where: { id },
        data: {
          amount,
          concept,
        },
      });
    },
    deleteMoneyMovement: async (_: any, { id }: { id: string }) => {
      await prisma.moneyMovement.delete({
        where: { id },
      });
      return true;
    },
  },
  MoneyMovement: {
    user: async (parent: any) => {
      return prisma.user.findUnique({
        where: { id: parent.userId },
      });
    },
  },
};

const typeDefs = gql`
  type User {
    id: String!
    name: String
    email: String!
    role: String!
    createdAt: String!
    updatedAt: String!
    moneyMovements: [MoneyMovement!]! # Relación con MoneyMovement
  }

  type MoneyMovement {
    id: String!
    userId: String
    amount: Float!
    concept: String!
    date: String! # Usamos String para manejar DateTime
    createdAt: String!
    updatedAt: String!
    user: User
  }

  type Query {
    users: [User!]!
    user(id: String!): User
    moneyMovements(email: String): [MoneyMovement!]! # Consulta opcional por email
    moneyMovement(id: String!): MoneyMovement
  }

  type Mutation {
    updateUser(id: String!, name: String, role: String): User!
    deleteUser(id: String!): Boolean

    createMoneyMovement(
      amount: Float!
      concept: String!
      date: String
    ): MoneyMovement!

    updateMoneyMovement(
      id: String!
      amount: Float
      concept: String
      date: String
    ): MoneyMovement!

    deleteMoneyMovement(id: String!): Boolean!
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async () => {
    const session = await auth(); // Obtenemos la sesión con el correo electrónico
    if (!session || session?.user.role !== 'admin') {
      throw new Error('Unauthorized');
    }

    return { session }; // Pasamos toda la sesión al contexto
  },
});

export { handler as GET, handler as POST };
