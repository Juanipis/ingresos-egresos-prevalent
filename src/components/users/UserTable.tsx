import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil, Trash } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export function UserTable({
  users,
  onEdit,
  onDelete,
}: Readonly<UserTableProps>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (users.length > 0) {
      setIsLoading(false);
    }
  }, [users]);

  if (isLoading) {
    return <Spinner size="large" />;
  }

  return (
    <Table className="min-w-full bg-white shadow-md rounded-lg">
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Rol</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" onClick={() => onEdit(user)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(user.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
