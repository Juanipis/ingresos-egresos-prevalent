import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User } from '@/features/users/types';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';

interface UserFormProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, role: string) => void;
  isLoading: boolean;
}

export function UserForm({
  user,
  isOpen,
  onClose,
  onSave,
  isLoading,
}: Readonly<UserFormProps>) {
  const [name, setName] = useState(user?.name || '');
  const [role, setRole] = useState(user?.role || 'user');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setRole(user.role);
    }
  }, [user]);

  const handleSave = () => {
    onSave(name, role);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Editar Usuario</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
          />
          <Select onValueChange={setRole} defaultValue={role}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          {isLoading ? (
            <Spinner size="medium" className="mt-4" />
          ) : (
            <Button onClick={handleSave} className="mt-4" disabled={isLoading}>
              Guardar Cambios
            </Button>
          )}
          <Button variant="ghost" onClick={onClose} className="mt-2">
            Cancelar
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
