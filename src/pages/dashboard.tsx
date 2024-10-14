import { auth } from '@/auth';
import { SignOut } from '@/components/signInButtom';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Session } from 'next-auth';

type SessionData = {
  session: Session;
};

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

export const getServerSideProps = (async (ctx) => {
  const session = await auth(ctx);
  if (!session) {
    console.log('Session no encontrada');
    return {
      redirect: {
        destination: '/', // Redirige a la página de inicio si no hay sesión
        permanent: false,
      },
    };
  }
  const datos: SessionData = {
    session: session,
  };

  return { props: { datos } };
}) satisfies GetServerSideProps<{ repo: SessionData }>;
