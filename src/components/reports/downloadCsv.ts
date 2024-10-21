import { MoneyMovement } from '@/features/money_movements/types';
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse'; // Cambiamos parse por unparse para generar el CSV

export const downloadCSV = (data: MoneyMovement[]) => {
  const flattenedData = data.map((movement) => ({
    id: movement.id,
    amount: movement.amount,
    concept: movement.concept,
    date: new Date(parseInt(movement.date)).toLocaleDateString(),
    createdAt: new Date(parseInt(movement.createdAt)).toLocaleDateString(),
    updatedAt: new Date(parseInt(movement.updatedAt)).toLocaleDateString(),
    userId: movement.user?.id || '',
    userName: movement.user?.name || '',
    userEmail: movement.user?.email || '',
  }));

  const csv = unparse(flattenedData);

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'reporte.csv');
};
