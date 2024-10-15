import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const isServer = typeof window === 'undefined';
const uri = isServer
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`
  : '/api/graphql';

const httpLink = new HttpLink({
  uri: uri, // El endpoint de tu servidor Apollo
  credentials: 'same-origin', // Para asegurarse de que las cookies se envíen
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
