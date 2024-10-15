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
import { signOut, useSession } from 'next-auth/react';

export default function UserDropdownMenu() {
  const session = useSession();
  console.log(session);
  const handleSignOut = () => {
    try {
      console.log('Cerrando sesión...');
      signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  if (!session.data) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage
              src={session?.data.user?.image ? session.data.user.image : ''}
              alt={session?.data.user?.name ? session.data.user.name : ''}
            />
            <AvatarFallback>
              {session.data.user?.name?.charAt(0) ?? 'U'}
            </AvatarFallback>
          </Avatar>
          <span>Hola {session?.data.user?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Nombre: {session?.data.user?.name}</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Email: {session?.data.user?.email}</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Rol: {session?.data.user?.role}</span>
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
