import Layout from '@/components/layout';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import { Spinner } from '@/components/ui/spinner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// Define the GraphQL queries and mutations
const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
      id
      name
      email
      role
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: String!, $name: String, $role: String) {
    updateUser(id: $id, name: $name, role: $role) {
      id
      name
      role
    }
  }
`;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Users() {
  const { loading, error, data } = useQuery(GET_USERS_QUERY);
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const users: User[] = data.users;

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setName(user.name);
    setRole(user.role);
    setIsDrawerOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;
    setIsLoading(true); // Mostrar el spinner de carga
    try {
      await updateUser({
        variables: {
          id: selectedUser.id,
          name,
          role,
        },
        refetchQueries: [{ query: GET_USERS_QUERY }],
      });
      setIsDrawerOpen(false);
      setIsAlertOpen(true); // Mostrar la alerta de éxito
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsLoading(false); // Ocultar el spinner de carga
      setSelectedUser(null);
    }
  };

  return (
    <Layout>
      <h2 className="text-xl font-semibold mb-4">Gestión de Usuarios</h2>
      <div className="overflow-x-auto">
        <Table className="min-w-full bg-white shadow-md rounded-lg">
          <TableRow>
            <TableHead className="py-2 px-4">Nombre</TableHead>
            <TableHead className="py-2 px-4">Email</TableHead>
            <TableHead className="py-2 px-4">Rol</TableHead>
            <TableHead className="py-2 px-4">Acciones</TableHead>
          </TableRow>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-t">
                <TableCell className="py-2 px-4">{user.name}</TableCell>
                <TableCell className="py-2 px-4">{user.email}</TableCell>
                <TableCell className="py-2 px-4">{user.role}</TableCell>
                <TableCell className="py-2 px-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditClick(user)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Drawer for editing user */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Editar Usuario</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <div className="mb-4">
              <Label>Nombre</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre"
              />
            </div>
            <div className="mb-4">
              <Label>Rol</Label>
              <Select onValueChange={setRole} defaultValue={role}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {isLoading ? (
              <Spinner size="medium" className="mt-4" />
            ) : (
              <Button
                onClick={handleUpdate}
                className="mt-4"
                disabled={isLoading}
              >
                Guardar Cambios
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={() => setIsDrawerOpen(false)}
              className="mt-2"
            >
              Cancelar
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
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
