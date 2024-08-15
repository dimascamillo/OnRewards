import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Onrewards",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.className} bg-background-primary text-gray-100`}
      >
        {children}
        <footer
          id="footer-primary"
          className="mt-[300px] h-[479px] flex justify-center p-12 items-center"
        >
          <section className="relative z-10 flex gap-8">
            <div className="w-1/3">
              <figure>
                <Image src="/logo.svg" width={200} height={200} alt="" />
              </figure>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum,
                mollitia. Praesentium consequatur qui repellat exercitationem,
                inventore labore doloremque eveniet tenetur perspiciatis dolorem
                maxime vero. Libero doloribus cumque porro nisi cum!
              </p>
            </div>

            {[
              {
                title: "Links úteis",
                links: [
                  { text: "Entrar", href: "/pages/signin" },
                  { text: "Cadastrar", href: "/pages/signup" },
                  { text: "Contato", href: "/pages/contact" },
                ],
              },
              {
                title: "Ajuda",
                links: [
                  { text: "Suporte", href: "/pages/signin" },
                  { text: "Termos e Condições", href: "/pages/signup" },
                  { text: "Política de Privacidade", href: "/pages/contact" },
                ],
              },
            ].map((section) => (
              <div key={section.title} className="w-1/3">
                <h2 className="text-xl font-medium border-b-2 border-yellow-primary-400 mb-4 w-1/4">
                  {section.title}
                </h2>

                <ul className="flex flex-col gap-2">
                  {section.links.map((link) => (
                    <li
                      key={link.text}
                      className="hover:text-yellow-primary-400 inline-block"
                    >
                      <Link href={link.href}>{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </footer>
      </body>
    </html>
  );
}
