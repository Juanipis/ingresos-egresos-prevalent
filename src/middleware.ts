import { auth } from '@/auth';

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== '/') {
    const newUrl = new URL('/', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  //protect /users, reports, if the user is not an admin
  if (
    req.auth &&
    !req.auth.user.role.includes('admin') &&
    req.nextUrl.pathname.startsWith('/users')
  ) {
    return new Response('Unauthorized', { status: 401 });
  }
});
export const config = {
  matcher: ['/((?!api/(?!graphql)|_next/static|_next/image|favicon.ico).*)'],
};
