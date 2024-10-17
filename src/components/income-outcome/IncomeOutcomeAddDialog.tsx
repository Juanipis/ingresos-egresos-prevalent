import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface IncomeOutcomeAddDialogProps {
  handleSubmit: (
    amount: number,
    concept: string,
    date: string
  ) => Promise<void>;
}

export default function IncomeOutcomeAddDialog({
  handleSubmit,
}: Readonly<IncomeOutcomeAddDialogProps>) {
  const [newMovement, setNewMovement] = useState({
    concept: '',
    amount: 0,
    date: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMovement((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    // Llama a la función `handleSubmit` con los valores de newMovement
    await handleSubmit(
      newMovement.amount,
      newMovement.concept,
      newMovement.date
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Nuevo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Movimiento de Dinero</DialogTitle>
        </DialogHeader>
        {/* Cambia el handleSubmit a handleFormSubmit */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Monto</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              value={newMovement.amount}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="concept">Concepto</Label>
            <Input
              id="concept"
              name="concept"
              value={newMovement.concept}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Fecha</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={newMovement.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit">Ingresar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
