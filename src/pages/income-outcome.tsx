import { InferGetServerSidePropsType } from 'next';
import { withAuth } from '@/utils/withAuth';
import Layout from '@/components/layout';

export default function IncomeOutcome({
  authData,
}: Readonly<InferGetServerSidePropsType<typeof getServerSideProps>>) {
  return (
    <Layout authData={authData}>
      <h2 className="text-xl font-semibold mb-4">
        Gestión de Ingresos y Egresos
      </h2>
      {/* Aquí va el contenido de ingresos y egresos */}
    </Layout>
  );
}

export const getServerSideProps = withAuth();
