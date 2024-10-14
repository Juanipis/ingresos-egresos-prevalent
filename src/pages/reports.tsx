import Layout from '@/components/layout';
import { InferGetServerSidePropsType } from 'next';
import { withAuth } from '@/utils/withAuth';

export default function Reports({
  authData,
}: Readonly<InferGetServerSidePropsType<typeof getServerSideProps>>) {
  return (
    <Layout authData={authData}>
      <h2 className="text-xl font-semibold mb-4">Reportes</h2>
      {/* Aquí va el contenido de los reportes */}
    </Layout>
  );
}

export const getServerSideProps = withAuth();
