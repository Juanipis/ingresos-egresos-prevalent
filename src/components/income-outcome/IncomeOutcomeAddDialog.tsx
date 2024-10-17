'use client';

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
import { useToast } from '@/hooks/use-toast';

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

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // Controlar el estado del diálogo
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMovement((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }));
  };

  const validateDate = (date: string) => {
    const selectedDate = new Date(date);
    const today = new Date();
    return selectedDate <= today;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateDate(newMovement.date)) {
      toast({
        variant: 'destructive',
        description: 'La fecha no puede ser mayor a la actual.',
      });
      return;
    }

    try {
      setLoading(true);
      await handleSubmit(
        newMovement.amount,
        newMovement.concept,
        newMovement.date
      );
      toast({ description: 'Movimiento añadido correctamente.' });
      setNewMovement({ concept: '', amount: 0, date: '' });
      setOpen(false);
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          'Ocurrió un error al añadir el movimiento. Inténtalo de nuevo.',
      });
      console.error(error);
    } finally {
      setLoading(false); // Termina el estado de carga
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Nuevo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Movimiento de Dinero</DialogTitle>
        </DialogHeader>
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
              disabled={loading} // Deshabilitar mientras está en carga
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
              disabled={loading} // Deshabilitar mientras está en carga
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
              disabled={loading}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Añadiendo...' : 'Ingresar'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
