'use client';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function SignIn() {
  return (
    <Button onClick={() => signIn('auth0')} className="w-full max-w-xs">
      Iniciar sesión con Auth0
    </Button>
  );
}
