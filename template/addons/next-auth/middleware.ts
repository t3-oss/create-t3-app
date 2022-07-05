// Example of a restricted route that only authenticated users can access https://next-auth.js.org/configuration/nextjs#middleware

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

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
