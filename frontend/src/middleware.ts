import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  if (
    !token &&
    request.nextUrl.pathname !== "/auth/login" &&
    request.nextUrl.pathname !== "/auth/register"
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tasks/:path*", "/profile/:path*"], // Adicione as rotas que você deseja proteger
};
