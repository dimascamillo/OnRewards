import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseCookies } from "nookies";

export function middleware(request: NextRequest) {
  // Utiliza o parseCookies do nookies para obter os cookies da requisição
  const cookies = parseCookies({ req: request });

  // Verifica se o cookie "token" existe
  if (!cookies.token) {
    console.log("nao possui token");
    // Se o cookie "token" não existir, redireciona o usuário para a rota /sign-in
    return NextResponse.redirect("http://localhost:3000/sign-in");
  } else {
    console.log("possui token");
    // Se o cookie "token" existir, redireciona o usuário para a rota /auth/dashboard
    return NextResponse.redirect("http://localhost:3000/auth/dashboard");
  }
}

export const config = {
  matcher: "/auth/:path*",
};
