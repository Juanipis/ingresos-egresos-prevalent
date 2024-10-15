import { auth } from '@/auth';
/*
Unfortunately you can't use withAuth if you're using a session database strategy. It only works with a jwt session strategy.
I'm trying to solve the same problem and haven't found a solution for it yet..

"For the time being, the withAuth middleware only supports "jwt" as session strategy."
https://next-auth.js.org/tutorials/securing-pages-and-api-routes#nextjs-middleware
https://github.com/nextauthjs/next-auth/discussions/6909
*/

export default auth((req) => {
  const pathRequest = req.nextUrl.pathname;
  const apiRequest = req.nextUrl.pathname.startsWith('/api');
  if (apiRequest) {
    console.log('API request');
    console.log(req.auth);
  }
  if (!req.auth && req.nextUrl.pathname !== '/login') {
    const newUrl = new URL('/', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
