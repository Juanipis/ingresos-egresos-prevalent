import { ApolloServer } from '@apollo/server';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
import { createContext } from './context';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

export const server = new ApolloServer({
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

export const handler = startServerAndCreateNextHandler(server, {
  context: createContext,
});
