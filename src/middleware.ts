import { auth } from '@/auth';

export default auth((req) => {
  let pathname = req.nextUrl.pathname;
  let auth = req.auth;

  if (!req.auth && req.nextUrl.pathname !== '/login') {
    const newUrl = new URL('/', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ['/(.*)'],
};
