'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useMoneyMovements } from '@/features/money_movements/hooks/useMoneyMovements';

export default function IncomeOutcomeComponent() {
  const { loading, error, moneyMovements, createMoneyMovementRecord } =
    useMoneyMovements();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMoneyMovementRecord(
        newMovement.amount,
        newMovement.concept,
        new Date(newMovement.date)
      );
      console.log('Movimiento creado');
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  //log the moneyMovements
  console.log(moneyMovements);

  const totalAmount = moneyMovements.reduce(
    (sum, movement) => sum + movement.amount,
    0
  );

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Ingresos y egresos</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Nuevo</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nuevo Movimiento de Dinero</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
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
      </div>
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
      <div className="text-right font-bold">
        Total: ${totalAmount.toFixed(2)}
      </div>
    </div>
  );
}
