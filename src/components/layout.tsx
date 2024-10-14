// components/Layout.tsx
import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import UserDropdownMenu from './userDropdownMenu';
import { SessionData } from '@/utils/withAuth';

interface LayoutProps {
  children: ReactNode;
  authData: SessionData;
}

export default function Layout({ children, authData }: Readonly<LayoutProps>) {
  const router = useRouter();
  const currentRoute = router.pathname;
  console.log(currentRoute);
  const [activeTab, setActiveTab] = useState<string>(currentRoute);

  const handleNavigation = (tab: string, path: string) => {
    setActiveTab(tab);
    router.push(path);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold">LOGO</h1>
        </div>
        <nav className="mt-6">
          <Button
            variant={activeTab === '/dashboard' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => handleNavigation('dashboard', '/dashboard')}
          >
            Dashboard
          </Button>
          <Button
            variant={activeTab === '/income-outcome' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() =>
              handleNavigation('income-outcome', '/income-outcome')
            }
          >
            Ingresos y Egresos
          </Button>
          <Button
            variant={activeTab === '/users' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => handleNavigation('users', '/users')}
          >
            Usuarios
          </Button>
          <Button
            variant={activeTab === '/reports' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => handleNavigation('reports', '/reports')}
          >
            Reportes
          </Button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm">
          <div className="py-4 px-4 flex justify-between items-center">
            <UserDropdownMenu authData={authData} />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
