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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.className} bg-brand-700 text-white h-screen flex justify-end items-center flex-col gap-52`}
      >
        {children}
        <Image
          src={iconLeft}
          alt=""
          width={184.58}
          height={630.43}
          className="absolute left-0 top-0"
        />
        <Image
          src={iconRight}
          alt=""
          width={449.41}
          height={651.18}
          className="absolute right-0 top-0"
        />
        <footer className="w-3/4 h-80 m-auto footer-background flex justify-center gap-4 p-4">
          <div className="w-1/3 flex justify-center flex-col gap-5">
            <figure className="w-72 h-16">
              <Image
                src={logo}
                alt=""
                className="w-full h-full object-contain"
              />
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
                  <a href="#">Página Inicial</a>
                </li>
                <li>
                  <a href="#">Meus Rewards</a>
                </li>
                <li>
                  <a href="#">Registrar</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="w-1/3 flex justify-center items-center flex-col gap-5 text-center">
            <h2 className="border-b-4 border-yellow-brand-200">Ajuda</h2>
            <nav>
              <ul>
                <li>
                  <a href="#">Como se cadastrar?</a>
                </li>
                <li>
                  <a href="#">Como funciona a plataforma?</a>
                </li>
                <li>
                  <a href="#">Suporte</a>
                </li>
              </ul>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
