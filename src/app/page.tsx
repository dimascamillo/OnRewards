import Image from "next/image";
import YellowPrimary from "./components/Buttons/YellowPrimary";
import Transparent from "./components/Buttons/Transparent";
import RedPrimary from "./components/Buttons/RedPrimary";
import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header>
        <li>
          <YellowPrimary content="Entrar" url="/pages/signin" />
        </li>
        <li>
          <Transparent content="Cadastrar" url="/pages/signup" />
        </li>
      </Header>

      <main className="relative z-10">
        <section className="text-center">
          <h1 className="text-6xl font-bold">Lorem ipsum dolor sit amet.</h1>
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
              {["Delisted Assets", "Featured", "Research Announcement"].map(
                (text) => (
                  <p
                    key={text}
                    className="w-auto h-12 text-white flex justify-center items-center bg-yellow-primary-400 rounded-md p-6"
                  >
                    {text}
                  </p>
                )
              )}
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
    </>
  );
}
