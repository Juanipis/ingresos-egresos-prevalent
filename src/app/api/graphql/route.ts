import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { Role } from '@prisma/client'; // Importamos el enum de Prisma
import { prisma } from '@/prisma';

const resolvers = {
  Query: {
    users: async () => {
      return prisma.user.findMany(); // Devuelve todos los usuarios
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

// Definimos el esquema GraphQL
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

// Crear el servidor Apollo
const server = new ApolloServer({
  resolvers,
  typeDefs,
});

// Usamos el helper de Apollo para Next.js
export const GET = startServerAndCreateNextHandler(server);
export const POST = startServerAndCreateNextHandler(server);
