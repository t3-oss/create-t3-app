import { withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export default withClerkMiddleware((_req: NextRequest) => {
  return NextResponse.next();
});

// Stop Middleware running on static files
export const config = {
  matcher: ["/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)", "/"],
};
