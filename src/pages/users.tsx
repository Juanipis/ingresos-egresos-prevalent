import { useState } from 'react';
import Layout from '@/components/layout';
import { UserForm } from '@/components/users/UserForm';
import { UserTable } from '@/components/users/UserTable';
import { useUsers } from '@/features/users/hooks/useUsers';
import { User } from '@/features/users/types';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export default function UsersPage() {
  const { loading, error, users, updateUserDetails } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  const handleUpdate = async (name: string, role: string) => {
    if (!selectedUser) return;
    setIsLoading(true);
    try {
      await updateUserDetails(selectedUser.id, name, role);
      setIsAlertOpen(true);
    } finally {
      setIsLoading(false);
      setIsDrawerOpen(false);
      setSelectedUser(null);
    }
  };

  return (
    <Layout>
      <h2 className="text-xl font-semibold mb-4">Gestión de Usuarios</h2>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error.message}</p>}
      <UserTable users={users} onEdit={handleEditClick} />
      <UserForm
        user={selectedUser}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleUpdate}
        isLoading={isLoading}
      />
      {isAlertOpen && (
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Usuario Actualizado</AlertDialogTitle>
              <AlertDialogDescription>
                Los cambios se han guardado exitosamente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button onClick={() => setIsAlertOpen(false)}>Cerrar</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </Layout>
  );
}
