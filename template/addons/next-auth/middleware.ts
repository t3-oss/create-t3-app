import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * This middleware will redirect to the home page if the user is not signed in and try to enter to "/profile".
 */
export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/profile/:path*",
};
