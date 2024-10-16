import { Role } from '@prisma/client';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  // eslint-disable-next-line no-unused-vars
  interface Session extends DefaultSession {
    user: {
      name: string;
      email: string;
      image: string;
      role: Role;
    };
  }
  // eslint-disable-next-line no-undef, no-unused-vars
  interface User extends DefaultUser {
    role?: string; // Asegúrate de que 'role' esté alineado como opcional
  }
}
