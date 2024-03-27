import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import cookie from "cookie";
import jwt from "jsonwebtoken";

const userTypeRoutes: { [key: string]: string } = {
  "0": "/auth/admin-dashboard",
  "1": "/auth/client-dashboard",
  "2": "/auth/manager-dashboard",
};

// Defina um tipo para o payload do seu token JWT
export interface JwtPayload {
  type: string;
}

export function decodeToken(token: string | undefined): JwtPayload | null {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.decode(token) as JwtPayload | null;
    if (decoded && typeof decoded === "object" && "type" in decoded) {
      return decoded;
    }
  } catch (error) {
    console.error("Failed to decode token:", error);
  }

  return null;
}
export async function middleware(request: NextRequest) {
  const cookies = cookie.parse(request.headers.get("Cookie") || "");
  const token = cookies["token"];

  const decodedToken = decodeToken(token);

  if (!decodedToken) {
    return NextResponse.redirect(`${process.env.BASE_URL}/sign-in`);
  }

  const userType = decodedToken.type;
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
