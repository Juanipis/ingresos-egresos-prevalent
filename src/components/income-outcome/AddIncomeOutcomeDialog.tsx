'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import IncomeOutcomeDialog from './IncomeOutcomeDialog';
import { MoneyMovementFormData } from './types/moneyMovementFormData';

interface AddIncomeOutcomeDialogProps {
  onAdd: (data: MoneyMovementFormData) => Promise<void>;
}

export default function AddIncomeOutcomeDialog({
  onAdd,
}: Readonly<AddIncomeOutcomeDialogProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Nuevo</Button>
      <IncomeOutcomeDialog
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={onAdd}
        initialData={{
          amount: 0,
          concept: '',
          date: new Date().toISOString().split('T')[0],
        }}
        title="Nuevo Movimiento de Dinero"
        submitButtonText="Ingresar"
      />
    </>
  );
}
