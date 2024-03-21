import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import cookie from "cookie";

export function middleware(request: NextRequest) {
  const cookies = cookie.parse(request.headers.get("Cookie") || "");
  const token = cookies["token"];

  if (!token) {
    console.log("nao existe token");
    return NextResponse.redirect("http://localhost:3000/sign-in");
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/auth/:path*",
};
