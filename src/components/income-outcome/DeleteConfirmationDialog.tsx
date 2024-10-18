import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  id: string;
  concept: string;
}

export function DeleteConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  id,
  concept,
}: Readonly<DeleteConfirmationDialogProps>) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmClick = async () => {
    setIsDeleting(true);
    try {
      await onConfirm(); // Ejecuta la función de confirmación (eliminación)
      onClose(); // Cierra el diálogo
    } catch (error) {
      console.error('Error al eliminar:', error);
    } finally {
      setIsDeleting(false); // Restablece el estado de carga
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que quieres eliminar el registro con ID <b>{id}</b>{' '}
            y concepto <b>{concept}</b>? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirmClick}
            disabled={isDeleting}
          >
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
