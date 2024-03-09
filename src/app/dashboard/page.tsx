"use client";

import { useState } from "react";
import Image from "next/image";

import {
  List,
  X,
  UserCirclePlus,
  UserCircle,
  SpeakerNone,
} from "@phosphor-icons/react/dist/ssr";

import logoMais1Cafe from "@public/mais1cafe.png";

export default function Dashboard() {
  const [widthMenu, setWidthMenu] = useState("w-20");
  const [iconMenu, setIconMenu] = useState(true);
  const [visibilityIconsMenu, setVisibilityIconsMenu] = useState("hidden");

  function handleWidthMenu() {
    if (widthMenu === "w-20") {
      setWidthMenu("w-64");
      setIconMenu(false);
      setVisibilityIconsMenu("");
    } else {
      setWidthMenu("w-20");
      setIconMenu(true);
      setVisibilityIconsMenu("hidden");
    }
  }

  return (
    <main className="flex items-start">
      <header
        className={`${widthMenu} flex justify-start items-center flex-col gap-7 h-screen bg-brand-600 p-5 transition-all relative z-10`}
      >
        <button onClick={handleWidthMenu}>
          {iconMenu ? <List size={22} /> : <X size={22} />}
        </button>

        <div
          className={`flex justify-center flex-col items-center gap-5 ${visibilityIconsMenu}`}
        >
          <figure className="w-32 h-32">
            <Image
              src={logoMais1Cafe}
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          </figure>
          <span>Mais Café</span>
        </div>
      </header>
      <section className="w-3/4 p-5">
        <div className="flex gap-4">
          <button className=" w-1/6 h-24 flex justify-center items-center gap-4 bg-yellow-brand-400 border-yellow-400 border-2 hover:bg-transparent  rounded-lg transition-all cursor-pointer text-black hover:text-white">
            <UserCirclePlus size={40} />
            <span>Associar cliente</span>
          </button>

          <button className=" w-1/6 h-24 flex justify-center items-center gap-4 bg-yellow-brand-400 border-yellow-400 border-2 hover:bg-transparent  rounded-lg transition-all cursor-pointer text-black hover:text-white">
            <UserCircle size={40} />
            <span>Meus clientes</span>
          </button>
        </div>
      </section>
    </main>
  );
}
