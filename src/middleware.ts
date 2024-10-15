// middleware.ts

import { auth } from '@/auth';

export default auth((req) => {
  // Permitir el acceso sin autenticación a "/" y "/login"
  if (req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/login') {
    return;
  }

  // Si la solicitud es a `/api/graphql` y el usuario no está autenticado, retornar un 401 sin redirigir
  if (req.nextUrl.pathname === '/api/graphql' && !req.auth) {
    console.log('Not authenticated');
    return new Response('Not authenticated', { status: 401 });
  }

  // Aquí puedes añadir lógica adicional para otras rutas si es necesario
});

export const config = {
  matcher: [
    /*
      Protege todas las rutas excepto:
      - Las rutas que empiezan con `/api/`
      - Archivos estáticos de Next.js (`/_next/static`, `/_next/image`)
      - El favicon
    */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
