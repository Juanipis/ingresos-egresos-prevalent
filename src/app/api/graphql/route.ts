import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { prisma } from '@/prisma';

import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/auth';

const resolvers = {
  Query: {
    users: async () => {
      return prisma.user.findMany({});
    },
    user: async (_: any, args: { id: string }) => {
      return prisma.user.findUnique({
        where: { id: args.id },
      });
    },
  },
  Mutation: {
    updateUser: async (
      _: any,
      args: { id: string; name: string; role: string }
    ) => {
      return prisma.user.update({
        where: { id: args.id },
        data: {
          name: args.name,
          role: args.role,
        },
      });
    },
    deleteUser: async (_: any, args: { id: string }) => {
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
  context: async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await auth(req, res);
    console.log(session);
    return { session };
  },
});

export { handler as GET, handler as POST };
