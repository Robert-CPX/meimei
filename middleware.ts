import { authMiddleware } from "@clerk/nextjs";

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/(api|trpc)(.*)'
  ],
};

// Clerk auth middleware
export default authMiddleware({
  publicRoutes: [
    '/',
    '/welcome',
  ],
  ignoredRoutes: [
    '/api/inworld',
    '/api/webhooks',
  ],
});