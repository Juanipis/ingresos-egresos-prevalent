import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { Role } from '@prisma/client';
import { prisma } from '@/prisma';

import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/auth';

const resolvers = {
  Query: {
    users: async () => {
      return prisma.user.findMany({
        cacheStrategy: { ttl: 60 },
      });
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
      args: { id: string; name: string; role: Role }
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
  enum Role {
    User
    Admin
  }

  type User {
    id: String!
    name: String
    email: String!
    role: Role!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    users: [User!]!
    user(id: String!): User
  }

  type Mutation {
    updateUser(id: String!, name: String, role: Role): User!
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

    return { session };
  },
});

export { handler as GET, handler as POST };
