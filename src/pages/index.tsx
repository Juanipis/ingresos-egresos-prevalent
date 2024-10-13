import Dashboard from "@/components/dashboard";
import SignIn, { SignOut } from "@/components/signInButtom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SessionProvider } from "next-auth/react";


export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-green-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Ingresos y egresos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-6">
            Bienvenido a nuestra aplicación de gestión financiera. Aquí podrás llevar un registro detallado de tus ingresos y egresos para un mejor control de tus finanzas personales.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <SignIn />
          <SignOut />
          <SessionProvider> <Dashboard /></SessionProvider>
          
        </CardFooter>
      </Card>
    </div>
  );
}
