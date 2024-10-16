import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { prisma } from '@/prisma';
import { auth } from '@/auth';

const resolvers = {
  Query: {
    users: async () => {
      return prisma.user.findMany({});
    },
    user: async (args: { id: string }) => {
      return prisma.user.findUnique({
        where: { id: args.id },
      });
    },
  },
  Mutation: {
    updateUser: async (args: { id: string; name: string; role: string }) => {
      return prisma.user.update({
        where: { id: args.id },
        data: {
          name: args.name,
          role: args.role,
        },
      });
    },
    deleteUser: async (args: { id: string }) => {
      await prisma.user.delete({
        where: { id: args.id },
      });
      return true;
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
  }

  type Query {
    users: [User!]!
    user(id: String!): User
  }

  type Mutation {
    updateUser(id: String!, name: String, role: String): User!
    deleteUser(id: String!): Boolean
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async () => {
    const session = await auth();
    if (session?.user.role !== 'admin') {
      throw new Error('Unauthorized');
    }
    return { session };
  },
});

export { handler as GET, handler as POST };
