import AddIncomeOutcomeDialog from '@/components/income-outcome/AddIncomeOutcomeDialog';
import IncomeOutcomeTable from '@/components/income-outcome/IncomeOutcomeTable';
import { MoneyMovementFormData } from '@/components/income-outcome/types/moneyMovementFormData';
import Layout from '@/components/layout';
import { useMoneyMovements } from '@/features/money_movements/hooks/useMoneyMovements';

export default function IncomeOutcome() {
  const {
    loading,
    error,
    moneyMovements,
    createMoneyMovementRecord,
    updateMoneyMovementRecord,
    deleteMoneyMovementRecord,
  } = useMoneyMovements();

  const handleAdd = async (data: MoneyMovementFormData) => {
    await createMoneyMovementRecord(
      data.amount,
      data.concept,
      new Date(data.date)
    );
  };

  const handleEdit = (id: string) => async (data: MoneyMovementFormData) => {
    await updateMoneyMovementRecord(
      id,
      data.amount,
      data.concept,
      new Date(data.date)
    );
  };

  const handleDelete = async (id: string) => {
    console.log('Eliminando registro con id:', id);
    try {
      await deleteMoneyMovementRecord(id);
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
          <AddIncomeOutcomeDialog onAdd={handleAdd} />
        </div>
        <IncomeOutcomeTable
          moneyMovements={moneyMovements}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <div className="text-right font-bold">
          Total: ${totalAmount.toFixed(2)}
        </div>
      </div>
    </Layout>
  );
}
