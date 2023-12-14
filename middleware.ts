import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const authPaths = ["/auth/signup", "/auth/signin"];
  const hasCookies = !!request.cookies.get("accessToken");
  if (!authPaths.includes(pathname) && !hasCookies) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  } else if (authPaths.includes(pathname) && hasCookies) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", "/perfil", "/auth/signup", "/auth/signin"
  ]
};