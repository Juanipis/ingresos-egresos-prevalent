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
    user: async (_: unknown, args: { id: string }) => {
      return prisma.user.findUnique({
        where: { id: args.id },
        include: {
          moneyMovements: true,
        },
      });
    },
    moneyMovements: async (_: unknown, args: { email?: string }) => {
      if (!args.email) {
        return prisma.moneyMovement.findMany({});
      }
      return prisma.moneyMovement.findMany({
        where: { user: { email: args.email } },
      });
    },
    moneyMovement: async (_: unknown, args: { id: string }) => {
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

      if (!user) {
        throw new Error('User not found');
      }

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
        data: {
          amount,
          concept,
        },
      });
    },
    deleteMoneyMovement: async (_: unknown, { id }: { id: string }) => {
      await prisma.moneyMovement.delete({
        where: { id },
      });
      return true;
    },
  },
  MoneyMovement: {
    user: async (parent: { userId: string }) => {
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
    moneyMovements: [MoneyMovement!]!
  }

  type MoneyMovement {
    id: String!
    userId: String
    amount: Float!
    concept: String!
    date: String!
    createdAt: String!
    updatedAt: String!
    user: User
  }

  type Query {
    users: [User!]!
    user(id: String!): User
    moneyMovements(email: String): [MoneyMovement!]!
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
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    return {
      message: error.message,
      locations: error.locations,
      path: error.path,
      extensions: error.extensions,
    };
  },
});

const handler = startServerAndCreateNextHandler(server, {
  context: async () => {
    const session = await auth();
    if (!session || session?.user.role !== 'admin') {
      throw new Error('Unauthorized');
    }

    return { session };
  },
});

export { handler as GET, handler as POST };
