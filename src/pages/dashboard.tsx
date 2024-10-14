import { InferGetServerSidePropsType } from 'next';
import { withAuth } from '@/utils/withAuth';
import Layout from '@/components/layout';

export default function Dashboard({
  authData,
}: Readonly<InferGetServerSidePropsType<typeof getServerSideProps>>) {
  return (
    <Layout authData={authData}>
      <h2 className="text-xl font-semibold mb-4">
        Sistema de gestión de ingresos y gastos
      </h2>
      {/* Aquí va el contenido del dashboard */}
    </Layout>
  );
}

export const getServerSideProps = withAuth();
