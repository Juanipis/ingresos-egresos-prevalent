'use client'; // Asegúrate de que este componente sea cliente
import { useSession } from 'next-auth/react';
import { LayoutDashboard, DiamondPlus, Users, FileCheck } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import UserDropdownMenu from '../userDropdownMenu';

// Menu items con flag de adminOnly.
const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    adminOnly: false,
  },
  {
    title: 'Ingresos y egresos',
    url: '/income-outcome',
    icon: DiamondPlus,
    adminOnly: true,
  },
  {
    title: 'Usuarios',
    url: '/users',
    icon: Users,
    adminOnly: true,
  },
  {
    title: 'Reportes',
    url: '/reports',
    icon: FileCheck,
    adminOnly: false,
  },
];

export function AppSidebar() {
  const { data: session } = useSession(); // Obtén la sesión

  const isAdmin = session?.user?.role.includes('admin'); // Verifica si el usuario es admin

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-2xl font-bold">LOGO</h1>
        <UserDropdownMenu />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Aplicación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items
                .filter((item) => !item.adminOnly || isAdmin) // Filtra los elementos que requieren ser admin
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export function AppSidebarTrigger() {
  return <SidebarTrigger />;
}
