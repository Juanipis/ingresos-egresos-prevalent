import NextAuth from 'next-auth';
import Auth0 from 'next-auth/providers/auth0';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Añadir el rol del usuario a la sesión
      session.user.role = user.role;
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
});
