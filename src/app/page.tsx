import Image from "next/image";
import YellowPrimary from "./components/Buttons/YellowPrimary";
import Transparent from "./components/Buttons/Transparent";
import Link from "next/link";
import RedPrimary from "./components/Buttons/RedPrimary";

export default function Home() {
  return (
    <>
      <header
        id="header-primary"
        className="flex justify-between items-center p-8"
      >
        <Link href={"/"}>
          <figure className="relative z-10">
            <Image src="/logo.svg" width={200} height={200} alt="logo" />
          </figure>
        </Link>

        <nav className="relative z-10">
          <ul className="flex gap-4">
            <li>
              <YellowPrimary content="Entrar" url="/pages/signin" />
            </li>
            <li>
              <Transparent content="Cadastrar" url="/pages/signup" />
            </li>
          </ul>
        </nav>
      </header>
      <main className="relative z-10">
        <section className="text-center">
          <h1 className="text-6xl font-bold ">Lorem ipsum dolor sit amet.</h1>
          <p className="text-sm mt-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
        </section>

        <section className="flex justify-center gap-8 items-center my-8">
          <figure>
            <Image src="/background-home.svg" width={500} height={500} alt="" />
          </figure>

          <aside className="w-1/4">
            <h2 className="text-3xl font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
              necessitatibus asperiores ut quod aut officiis
            </h2>

            <div className="flex gap-4 my-8 flex-wrap">
              <p className="w-auto h-12 text-white flex justify-center items-center bg-yellow-primary-400 rounded-md p-6">
                Delisted Assets
              </p>
              <p className="w-auto h-12 text-white flex justify-center items-center bg-yellow-primary-400 rounded-md p-6">
                Featured
              </p>
              <p className="w-auto h-12 text-white flex justify-center items-center bg-yellow-primary-400 rounded-md p-6">
                Research Announcement
              </p>
            </div>

            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
              enim fugit omnis accusamus minus,{" "}
            </p>
          </aside>
        </section>

        <section
          id="comunidade"
          className="flex justify-center gap-8 items-center my-32"
        >
          <aside className="w-1/4 flex flex-col gap-8 relative z-10">
            <h2 className="text-3xl font-medium">
              Faça parte da maior comunidade de varejistas!
            </h2>

            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
              enim fugit omnis accusamus minus,{" "}
            </p>

            <YellowPrimary content="Saiba mais" url="#" />
          </aside>

          <figure>
            <Image
              src="/franquiado-banner.png"
              width={500}
              height={500}
              alt=""
            />
          </figure>
        </section>

        <section className="w-4/5 h-64 m-auto bg-yellow-primary-400 relative mt-[450px] p-7 rounded-lg">
          <figure className="absolute bottom-[-211px]">
            <Image
              src="/cupom-promocional.png"
              width={674}
              height={814}
              alt=""
            />
          </figure>

          <div className="flex flex-col items-end gap-3 w-1/2 ml-auto">
            <h2 className="text-3xl font-medium border-b-2 border-red-primary-400 text-gray-900">
              Lorem ipsum dolor sit amet.
            </h2>
            <p className="text-lg text-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              tenetur unde reiciendis sunt modi perferendis? Repellat enim eos
              et ratione provident. Quae nisi optio debitis unde incidunt ad
              pariatur delectus!
            </p>
            <RedPrimary content="Saiba mais" url="#" />
          </div>
        </section>
      </main>
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

          <div className="w-1/3">
            <h2 className="text-xl font-medium border-b-2 border-yellow-primary-400 mb-4">
              Links úteis
            </h2>

            <ul className="flex flex-col gap-2">
              <li className="hover:text-yellow-primary-400 inline-block">
                <Link href={"/pages/signin"}>Entrar</Link>
              </li>
              <li className="hover:text-yellow-primary-400 inline-block">
                <Link href={"/pages/signup"}>Cadastrar</Link>
              </li>
              <li className="hover:text-yellow-primary-400 inline-block">
                <Link href={"/pages/contact"}>Contato</Link>
              </li>
            </ul>
          </div>

          <div className="w-1/3">
            <h2 className="text-xl font-medium border-b-2 border-yellow-primary-400 mb-4">
              Ajuda
            </h2>

            <ul className="flex flex-col gap-2">
              <li className="hover:text-yellow-primary-400 inline-block">
                <Link href={"/pages/signin"}>Suporte</Link>
              </li>
              <li className="hover:text-yellow-primary-400 inline-block">
                <Link href={"/pages/signup"}>Termos e Condições</Link>
              </li>
              <li className="hover:text-yellow-primary-400 inline-block">
                <Link href={"/pages/contact"}>Política de Privacidade</Link>
              </li>
            </ul>
          </div>
        </section>
      </footer>
    </>
  );
}
