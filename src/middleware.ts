import { auth } from '@/auth';

export default auth((req) => {
  const path = req.nextUrl.pathname;
  const auth = req.auth;
  console.log('------------------------------------');
  console.log('path', path);
  console.log('auth', auth);
  console.log('------------------------------------');
  if (!req.auth && req.nextUrl.pathname !== '/') {
    const newUrl = new URL('/', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
export const config = {
  matcher: ['/((?!api/(?!graphql)|_next/static|_next/image|favicon.ico).*)'],
};
