'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import IncomeOutcomeDialog from './IncomeOutcomeDialog';
import { Pencil } from 'lucide-react';
import { MoneyMovementFormData } from './types/moneyMovementFormData';

interface EditIncomeOutcomeDialogProps {
  onEdit: (data: MoneyMovementFormData) => Promise<void>;
  initialData: MoneyMovementFormData;
}

export default function EditIncomeOutcomeDialog({
  onEdit,
  initialData,
}: Readonly<EditIncomeOutcomeDialogProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button variant="ghost" size="icon" onClick={handleOpen}>
        <Pencil className="h-4 w-4" />
      </Button>
      <IncomeOutcomeDialog
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={onEdit}
        initialData={initialData}
        title="Editar Movimiento"
        submitButtonText="Actualizar"
      />
    </>
  );
}
