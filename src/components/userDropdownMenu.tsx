'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User } from 'lucide-react';
import { WithAuthProps } from '@/utils/withAuth';
import { signOut } from 'next-auth/react';

export default function UserDropdownMenu({
  authData,
}: Readonly<WithAuthProps>) {
  const handleSignOut = () => {
    try {
      console.log('Cerrando sesión...');
      signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage
              src={authData.session.user?.image}
              alt={authData.session.user?.name}
            />
            <AvatarFallback>
              {authData.session.user?.name?.charAt(0) ?? 'U'}
            </AvatarFallback>
          </Avatar>
          <span>Hola {authData.session.user?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Nombre: {authData.session.user?.name}</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Email: {authData.session.user?.email}</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Rol: {authData.session.user?.role}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
