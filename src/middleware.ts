import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import cookie from "cookie";

const userTypeRoutes: { [key: string]: string } = {
  "0": "/auth/admin-dashboard",
  "1": "/auth/client-dashboard",
  "2": "/auth/manager-dashboard",
};

export async function middleware(request: NextRequest) {
  const cookies = cookie.parse(request.headers.get("Cookie") || "");
  const token = cookies["token"];
  const userType = cookies["userType"];

  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");

  if (!token) {
    return NextResponse.redirect(`${process.env.BASE_URL}/sign-in`);
  }

  if (isAuthRoute) {
    if (request.nextUrl.pathname === userTypeRoutes[userType]) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        `${process.env.BASE_URL}${userTypeRoutes[userType]}`
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/auth/:path*",
};
