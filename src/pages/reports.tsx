import Layout from '@/components/layout';
import MoneyMovementsBarChart from '@/components/reports/reports';

export default function Reports() {
  return (
    <Layout>
      <h2 className="text-xl font-semibold mb-4">Reportes</h2>
      <MoneyMovementsBarChart />
    </Layout>
  );
}
