/**
 * Example of a middleware that blocks access to routes that only authenticated users can navigate to
 * e.g. `http://localhost:300/protected/profile`
 * Read more: https://next-auth.js.org/configuration/nextjs#middleware
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    // If the user is not authenticated, redirect to the login page https://nextjs.org/docs/api-reference/next/server#static-methods
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Example of a "matcher" that filters where the middleware should be applied
// https://nextjs.org/docs/advanced-features/middleware#matcher
export const config = {
  matcher: "/protected/:path*",
};
