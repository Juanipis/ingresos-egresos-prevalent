import IncomeOutcomeAddDialog from '@/components/income-outcome/IncomeOutcomeAddDialog';
import IncomeOutcomeTable from '@/components/income-outcome/IncomeOutcomeTable';
import Layout from '@/components/layout';
import { useMoneyMovements } from '@/features/money_movements/hooks/useMoneyMovements';

export default function IncomeOutcome() {
  const { loading, error, moneyMovements, createMoneyMovementRecord } =
    useMoneyMovements();

  const handleSubmit = async (amount, concept, date) => {
    try {
      await createMoneyMovementRecord(amount, concept, new Date(date));
      console.log('Movimiento creado');
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const totalAmount = moneyMovements.reduce(
    (sum, movement) => sum + movement.amount,
    0
  );
  return (
    <Layout>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Ingresos y egresos</h2>
          <IncomeOutcomeAddDialog handleSubmit={handleSubmit} />
        </div>
        <IncomeOutcomeTable moneyMovements={moneyMovements} />
        <div className="text-right font-bold">
          Total: ${totalAmount.toFixed(2)}
        </div>
      </div>
    </Layout>
  );
}
