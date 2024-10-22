'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Users, DiamondPlus, FileCheck } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface DashboardOption {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  adminOnly: boolean;
}

const dashboardOptions: DashboardOption[] = [
  {
    title: 'Ingresos y egresos',
    description: 'Gestiona tus fuentes de ingresos',
    icon: <DiamondPlus className="h-6 w-6" />,
    href: '/income-outcome',
    adminOnly: true,
  },
  {
    title: 'Usuarios',
    description: 'Controla tus gastos diarios',
    icon: <Users className="h-6 w-6" />,
    href: '/users',
    adminOnly: true,
  },
  {
    title: 'Reportes',
    description: 'Visualiza tus reportes de gastos',
    icon: <FileCheck className="h-6 w-6" />,
    href: '/reports',
    adminOnly: false,
  },
];

export default function DashboardContent() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role.includes('admin');

  const filteredOptions = dashboardOptions.filter((option) => {
    if (isAdmin) {
      return true; // Mostrar todas las opciones si es admin
    }
    return !option.adminOnly; // Mostrar solo las opciones que no son solo para admin
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 bg-primary/10 p-4 rounded-lg">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={session?.user?.image ? session.user.image : ''}
            alt={session?.user?.name}
          />
          <AvatarFallback>{}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Hola {session?.user?.name},</h1>
          <p className="text-muted-foreground">¿Qué desea hacer hoy?</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {filteredOptions.map((option, index) => (
          <Card key={index} className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  {option.icon}
                  <span>{option.title}</span>
                </span>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={option.href}>
                    <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">Ir a {option.title}</span>
                  </Link>
                </Button>
              </CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
