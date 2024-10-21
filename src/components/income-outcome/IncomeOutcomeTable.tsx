import React, { useState } from 'react';
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
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
import { useToast } from '@/hooks/use-toast'; // Asegúrate de que este hook existe

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMovement, setSelectedMovement] =
    useState<MoneyMovement | null>(null);
  const { toast } = useToast();

  const handleDeleteClick = (movement: MoneyMovement) => {
    setSelectedMovement(movement);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedMovement) {
      try {
        await onDelete(selectedMovement.id);
        toast({
          description: `El movimiento con concepto "${selectedMovement.concept}" fue eliminado correctamente.`,
        });
        setIsDialogOpen(false);
        setSelectedMovement(null);
      } catch (error) {
        console.error('Error al eliminar:', error);
        toast({
          variant: 'destructive',
          description: 'Ocurrió un error al eliminar el movimiento.',
        });
      }
    }
  };

  return (
    <>
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
                  onClick={() => handleDeleteClick(movement)} // Maneja el clic para eliminar
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Renderizamos el DeleteConfirmationDialog */}
      {selectedMovement && (
        <DeleteConfirmationDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onConfirm={handleConfirmDelete}
          id={selectedMovement.id} // Pasamos el ID del movimiento seleccionado
          concept={selectedMovement.concept} // Pasamos el concepto del movimiento
        />
      )}
    </>
  );
}
