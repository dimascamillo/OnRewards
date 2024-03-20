import Image from "next/image";

import iconLeft from "@public/icon-left.svg";
import iconRight from "@public/icon-right.svg";
import logo from "@public/logo.svg";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={` bg-brand-700 text-white h-screen`}>
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
                  className="flex justify-center items-center w-28 h-11 border-yellow-400 border-2 bg-transparent hover:bg-yellow-brand-400 text-white rounded-lg transition-all cursor-pointer"
                  href="/"
                >
                  Sair
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
      </body>
    </html>
  );
}
