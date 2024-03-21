// src/middleware/auth.ts
import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";

export function middleware(request: NextRequest) {
  // Verifica se a rota atual está dentro do diretório /auth
  if (request.nextUrl.pathname.startsWith("/auth")) {
    // Lê os cookies da requisição
    const cookies = cookie.parse(request.headers.get("Cookie") || "");
    // Verifica se o token de autenticação existe
    if (!cookies.authToken) {
      // Redireciona para a página de login se o token não existir
      return NextResponse.redirect("/sign-in");
    }
  }

  // Se o token existir ou a rota não estiver dentro de /auth, permite a requisição prosseguir
  return NextResponse.next();
}
