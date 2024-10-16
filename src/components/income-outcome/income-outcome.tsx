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

type Movement = {
  id: number;
  concept: string;
  amount: number;
  date: string;
  user: string;
};

export default function IncomeOutcomeComponent() {
  const [movements, setMovements] = useState<Movement[]>([
    {
      id: 1,
      concept: 'Salary',
      amount: 5000,
      date: '2023-05-01',
      user: 'John Doe',
    },
    {
      id: 2,
      concept: 'Rent',
      amount: -1000,
      date: '2023-05-02',
      user: 'John Doe',
    },
    {
      id: 3,
      concept: 'Groceries',
      amount: -200,
      date: '2023-05-03',
      user: 'Jane Doe',
    },
  ]);

  const [newMovement, setNewMovement] = useState<Omit<Movement, 'id' | 'user'>>(
    {
      concept: '',
      amount: 0,
      date: '',
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMovement((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = movements.length + 1;
    const user = 'Current User'; // This would typically come from an authentication context
    setMovements([...movements, { ...newMovement, id, user }]);
    setNewMovement({ concept: '', amount: 0, date: '' });
  };

  const totalAmount = movements.reduce(
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
          {movements.map((movement) => (
            <TableRow key={movement.id}>
              <TableCell>{movement.concept}</TableCell>
              <TableCell>{movement.amount.toFixed(2)}</TableCell>
              <TableCell>{movement.date}</TableCell>
              <TableCell>{movement.user}</TableCell>
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
