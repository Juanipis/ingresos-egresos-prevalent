import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import EditIncomeOutcomeDialog from './EditIncomeOutcomeDialog';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { MoneyMovementFormData } from './types/moneyMovementFormData';

interface MoneyMovement {
  id: string;
  concept: string;
  amount: number;
  date: string;
  user: {
    name: string;
  };
}

interface IncomeOutcomeTableProps {
  moneyMovements: MoneyMovement[];
  onEdit: (id: string) => (data: MoneyMovementFormData) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function IncomeOutcomeTable({
  moneyMovements,
  onEdit,
  onDelete,
}: Readonly<IncomeOutcomeTableProps>) {
  return (
    <Table className="min-w-full bg-white shadow-md rounded-lg">
      <TableHeader>
        <TableRow>
          <TableHead>Concepto</TableHead>
          <TableHead>Monto</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Usuario</TableHead>
          <TableHead>Acciones</TableHead>
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
            <TableCell>
              <EditIncomeOutcomeDialog
                onEdit={onEdit(movement.id)}
                initialData={{
                  amount: movement.amount,
                  concept: movement.concept,
                  date: new Date(parseInt(movement.date))
                    .toISOString()
                    .split('T')[0],
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(movement.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
