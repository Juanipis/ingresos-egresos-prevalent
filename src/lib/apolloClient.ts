import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client';

const httpLink = new HttpLink({
  uri: '/api/graphql', // GraphQL endpoint
  credentials: 'same-origin', // This ensures cookies are sent with each request
});

const apolloClient = new ApolloClient({
  link: ApolloLink.from([httpLink]), // ApolloLink allows you to chain multiple links together
  cache: new InMemoryCache(), // Apollo caching mechanism
});

export default apolloClient;
