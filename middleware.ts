import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Mi ddleware
export default authMiddleware({
  // An array of public routes that don't require authentication.
  publicRoutes: ["/api/webhook/clerk"],

  // An array of routes to be ignored by the authentication middleware.
  ignoredRoutes: ["/api/webhook/clerk"],
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 
// To make the route accessible to both signed in and signed out users, add "/" to the `publicRoutes` array passed to authMiddleware
// To prevent Clerk authentication from running at all, add "/" to the `ignoredRoutes` array passed to authMiddleware
// Pass a custom `afterAuth` to authMiddleware, and replace Clerk's default behavior of redirecting unless a route is included in publicRoutes