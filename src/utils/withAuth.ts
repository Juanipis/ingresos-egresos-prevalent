// /utils/withAuth.ts
import { GetServerSideProps } from 'next';
import { auth } from '@/auth';
import { Session } from 'next-auth';

type SessionData = {
  session: Session;
};

export const withAuth = (gssp?: GetServerSideProps) => {
  const authHandler: GetServerSideProps = async (ctx) => {
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
      session,
    };

    const gsspData = gssp ? await gssp(ctx) : { props: {} };

    return {
      ...gsspData,
      props: {
        ...gsspData.props,
        datos,
      },
    };
  };

  return authHandler;
};
