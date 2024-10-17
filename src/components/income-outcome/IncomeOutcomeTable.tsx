import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoneyMovement } from '@/features/money_movements/types';

interface IncomeOutcomeTableProps {
  moneyMovements: MoneyMovement[];
}

export default function IncomeOutcomeTable({
  moneyMovements,
}: Readonly<IncomeOutcomeTableProps>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Concepto</TableHead>
          <TableHead>Monto</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Usuario</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {moneyMovements.map((movement) => (
          <TableRow key={movement.id}>
            <TableCell>{movement.concept}</TableCell>
            <TableCell>{movement.amount.toFixed(2)}</TableCell>

            <TableCell>
              {new Date(parseInt(movement.date)).toLocaleDateString()}
            </TableCell>
            <TableCell>{movement.user.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
