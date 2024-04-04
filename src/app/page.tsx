import Image from "next/image";

import bannerHome from "@public/background-home.svg";
import logo from "@public/logo.svg";
import MenuHeader from "./components/MenuHeader";
import { AdminProvider } from "./contexts/AdminContext";

export default function Home() {
  return (
    <>
      <header className="flex justify-between items-center p-5 relative z-10">
        <figure className="w-72 h-16">
          <a href="/">
            <Image src={logo} alt="" className="w-full h-full object-contain" />
          </a>
        </figure>

        <MenuHeader />
      </header>
      <main className="flex flex-col md:flex-row justify-center items-center p-5">
        <section className="w-full md:w-1/3">
          <h1 className="text-3xl md:text-5xl text-yellow-500">
            Bem vindo à <span className="text-white font-black">OnRewards</span>
            , sua conexão entre seus clientes e você!
          </h1>

          <p className="mt-5 text-xl md:text-3xl">Solicitar um teste grátis!</p>

          <button className="mt-5 bg-yellow-brand-400 text-white rounded-lg flex justify-center items-center w-full md:w-40 h-14 border-yellow-400 border-2 hover:bg-transparent transition-all cursor-pointer">
            Teste Grátis
          </button>
        </section>

        <figure className="w-full md:w-1/3 h-full mb-8">
          <Image
            src={bannerHome}
            alt=""
            className="w-full h-full object-contain"
          />
        </figure>
      </main>
    </>
  );
}
