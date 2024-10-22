import { auth } from '@/auth';

export async function createContext() {
  const session = await auth();
  if (!session || session.user.role !== 'admin') {
    throw new Error('Unauthorized');
  }

  return { session };
}
