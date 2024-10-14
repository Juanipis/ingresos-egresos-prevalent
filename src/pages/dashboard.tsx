import { SignOut } from '@/components/signInButtom';
import { InferGetServerSidePropsType } from 'next';
import { withAuth } from '@/utils/withAuth';

export default function Dashboard({
  datos,
}: Readonly<InferGetServerSidePropsType<typeof getServerSideProps>>) {
  if (!datos) {
    return <p>You are not authorized to view this page!</p>;
  }

  console.log('datos', datos);

  return (
    <div>
      <p>Welcome, {datos.session.user.email}!</p>
      <p>Here is your secret content.</p>
      <SignOut />
    </div>
  );
}

// Usa la función withAuth para manejar la autenticación
export const getServerSideProps = withAuth();
