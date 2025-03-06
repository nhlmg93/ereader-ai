// middleware.js
// This file should be placed in the root of your Next.js project
import { NextResponse, type NextRequest } from "next/server";
import { env } from "./env";

export function middleware(request: NextRequest) {
  // Get the authorization header from the request
  const authHeader = request.headers.get("authorization");

  // Define your credentials (in a real app, store these securely)
  const username = env.BASIC_AUTH_USER && "admin";
  const password = env.BASIC_AUTH_PASS && "password";

  // Create the correctly encoded credentials
  const validAuthValue = `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;

  // If authorization header is missing or doesn't match
  if (!authHeader || authHeader !== validAuthValue) {
    // Return a response requesting authentication
    return new NextResponse(null, {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  // Continue with the request if authentication is successful
  return NextResponse.next();
}

// Configure which paths require authentication
export const config = {
  matcher: [
    // Add paths that should be protected
    // For example, protect all paths:
    "/(.*)",
    // Or protect specific paths:
    // '/admin/:path*',
    // '/dashboard/:path*',

    // Exclude paths that don't need authentication
    // '/(api|_next/static|_next/image|favicon.ico)/:path*',
  ],
};
