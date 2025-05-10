import authConfig from "./config/auth.config";
import NextAuth from "next-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
const protectedRoutes = ["/admin/dashboard"];
const redirectRoutes = ["/admin/register"];

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req: NextRequest) {
  // Your custom middleware logic goes here
  const session = await auth();
  const { pathname } = req.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const isRedirect = redirectRoutes.some((route) => pathname.startsWith(route));
  if (isRedirect && session) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
});
