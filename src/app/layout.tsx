import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OnRewards",
  description: "Conectando você e seus clientes.",
};

import iconLeft from "@public/icon-left.svg";
import iconRight from "@public/icon-right.svg";
import logo from "@public/logo.svg";
import logoOnBit from "@public/logo.png";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-brand-700 text-white h-screen`}>
        <header className="flex justify-between items-center p-5 relative z-10">
          <figure className="w-72 h-16">
            <a href="/">
              <Image
                src={logo}
                alt=""
                className="w-full h-full object-contain"
              />
            </a>
          </figure>

          <nav>
            <ul className="flex justify-center items-center gap-3">
              <li>
                <a
                  className="flex justify-center items-center w-28 h-11 bg-yellow-brand-400 border-yellow-400 border-2 hover:bg-transparent text-white rounded-lg transition-all cursor-pointer"
                  href="/sign-in"
                >
                  Logar
                </a>
              </li>

              <li>
                <a
                  className="flex justify-center items-center w-36 h-11 border-yellow-400 border-2 bg-transparent hover:bg-yellow-brand-400 text-white rounded-lg transition-all cursor-pointer"
                  href="/area-do-cliente"
                >
                  Área do Cliente
                </a>
              </li>
            </ul>
          </nav>
        </header>
        {children}
        <Image
          src={iconLeft}
          alt=""
          width={184.58}
          height={630.43}
          className="absolute left-0 top-40"
        />
        <Image
          src={iconRight}
          alt=""
          width={449.41}
          height={651.18}
          className="absolute right-0 top-40"
        />
        <footer className="w-3/4 h-80 m-auto footer-background flex justify-center gap-4 p-4 flex-wrap">
          <div className="w-1/4 flex justify-center items-center flex-col gap-5 text-center">
            <figure className="w-72 h-16">
              <a className="cursor-pointer" href="/">
                <Image
                  src={logo}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </a>
            </figure>
            <p className="pb-3">
              Lorem Ipsum is simply dummy text of the printing and type setting
              industry. Lorem Ipsum has been the industry.
            </p>
          </div>
          <div className="w-1/3 flex justify-center items-center flex-col gap-5 text-center">
            <h2 className="border-b-4 border-yellow-brand-200">Links úteis</h2>
            <nav>
              <ul>
                <li>
                  <a href="/">Página Inicial</a>
                </li>
                <li>
                  <a href="/">Meus Rewards</a>
                </li>
                <li>
                  <a href="/sign-up">Registrar</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="w-1/3 flex justify-center items-center flex-col gap-5 text-center">
            <h2 className="border-b-4 border-yellow-brand-200">Ajuda</h2>
            <nav>
              <ul>
                <li>
                  <a href="/">Como se cadastrar?</a>
                </li>
                <li>
                  <a href="/">Como funciona a plataforma?</a>
                </li>
                <li>
                  <a href="/">Suporte</a>
                </li>
              </ul>
            </nav>
          </div>
        </footer>

        <section className="w-full h-20 bg-brand-700 flex justify-center items-center gap-5">
          <p>Desenvolvido Por:</p>
          <figure className="h-10">
            <a
              className="cursor-pointer"
              href="https://agenciaonbit.com.br"
              target="_blank"
            >
              <Image
                src={logoOnBit}
                alt=""
                className="w-full h-full object-contain"
              />
            </a>
          </figure>
        </section>
      </body>
    </html>
  );
}
