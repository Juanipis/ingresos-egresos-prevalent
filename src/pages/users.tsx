import Layout from '@/components/layout';
import { InferGetServerSidePropsType } from 'next';
import { withAuth } from '@/utils/withAuth';

export default function Users({
  authData,
}: Readonly<InferGetServerSidePropsType<typeof getServerSideProps>>) {
  return (
    <Layout authData={authData}>
      <h2 className="text-xl font-semibold mb-4">Gestión de Usuarios</h2>
      {/* Aquí va el contenido de usuarios */}
    </Layout>
  );
}

export const getServerSideProps = withAuth();
