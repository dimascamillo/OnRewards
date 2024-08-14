import Image from "next/image";
import YellowPrimary from "./components/Buttons/YellowPrimary";
import Transparent from "./components/Buttons/Transparent";
import Link from "next/link";

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
              <YellowPrimary content="Entrar" url="/pages/login" />
            </li>
            <li>
              <Transparent content="Cadastrar" url="/pages/register" />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
