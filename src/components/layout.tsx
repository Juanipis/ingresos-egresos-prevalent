import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion'; // Import Framer Motion
import { SidebarProvider } from './ui/sidebar';
import { AppSidebar, AppSidebarTrigger } from './ui/app-sidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<LayoutProps>) {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex h-screee w-screen">
        <AppSidebarTrigger />
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Page content with Framer Motion */}
          <motion.main
            key={currentRoute} // key based on the route for unique transitions
            initial={{ opacity: 0, y: 20 }} // Initial state: slightly below with 0 opacity
            animate={{ opacity: 1, y: 0 }} // Animate to: fully visible and in place
            exit={{ opacity: 0, y: 20 }} // Exit state: fade out and slide down
            transition={{ duration: 0.3 }} // Duration of transition
            className="flex-1 overflow-x-hidden overflow-y-auto"
          >
            <div className="px-6 py-8">{children}</div>
          </motion.main>
        </div>
      </div>
    </SidebarProvider>
  );
}
