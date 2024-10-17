import '@/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';
import client from '@/lib/apolloClient';
import type { AppProps } from 'next/app';
import { Toaster } from '@/components/ui/toaster';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
        <Toaster />
      </ApolloProvider>
    </SessionProvider>
  );
}
