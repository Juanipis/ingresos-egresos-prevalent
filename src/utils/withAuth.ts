import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { auth } from '@/auth';
import { Session } from 'next-auth';

// Definimos el tipo para los authData de sesión que pasamos como prop
type SessionData = {
  session: Session;
};

// Definimos el tipo para los props que devuelve withAuth
type WithAuthProps = {
  authData: SessionData;
};

// Refactorizamos withAuth para incluir la tipificación de los props
export const withAuth = (
  gssp?: GetServerSideProps
): GetServerSideProps<WithAuthProps> => {
  const authHandler: GetServerSideProps<WithAuthProps> = async (ctx) => {
    const session = await auth(ctx);

    // Si no hay sesión, redirigimos
    if (!session) {
      console.log('Session no encontrada');
      return {
        redirect: {
          destination: '/', // Redirige a la página de inicio si no hay sesión
          permanent: false,
        },
      } as GetServerSidePropsResult<WithAuthProps>;
    }

    // Si hay sesión, creamos los authData de sesión
    const authData: SessionData = {
      session,
    };

    // Llamamos al gssp si existe, de lo contrario usamos un objeto vacío
    const gsspData = gssp ? await gssp(ctx) : { props: {} };

    // Retornamos los authData combinados con los props de gssp (si existen)
    return {
      ...gsspData,
      props: {
        ...gsspData.props,
        authData,
      },
    };
  };

  return authHandler;
};

// Exportamos el tipo de los props que devuelve withAuth
export type { WithAuthProps, SessionData };
