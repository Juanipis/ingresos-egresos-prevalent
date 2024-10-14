import { SignOut } from '@/components/signInButtom';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const { data: session } = useSession();
  if (!session) {
    return <p>You are not authorized to view this page!</p>;
  }

  return (
    <div>
      <p>Welcome, {session.user.email}!</p>
      <p>Here is your secret content.</p>
      <SignOut />
    </div>
  );
}
