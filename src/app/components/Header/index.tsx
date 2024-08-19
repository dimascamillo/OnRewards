import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface HeaderProps {
  children?: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header
      id="header-primary"
      className="flex justify-between items-center p-8"
    >
      <Link href="/">
        <figure className="relative z-10">
          <Image src="/logo.svg" width={200} height={200} alt="logo" />
        </figure>
      </Link>

      <nav className="relative z-10">
        <ul className="flex items-center gap-4">{children}</ul>
      </nav>
    </header>
  );
}
