// src/pages/index.tsx
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SignIn from '@/components/signInButtom';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard'); // Redirigir si hay sesión
    }
  }, [session, router]);

  // Mientras verificamos la sesión, mostramos un cargando
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // Si no hay sesión, muestra la página de inicio
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-green-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Ingresos y egresos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-6">
            Bienvenido a nuestra aplicación de gestión financiera.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <SignIn />
        </CardFooter>
      </Card>
    </div>
  );
}
