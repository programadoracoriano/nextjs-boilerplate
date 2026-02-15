import createMiddleware from 'next-intl/middleware';
import NextAuth from 'next-auth';
import { routing } from './src/i18n/routing';
import { authConfig } from './auth.config';

const { auth } = NextAuth(authConfig);
const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    '/',
    '/(pt|en)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
