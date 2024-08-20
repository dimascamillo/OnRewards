"use client";

import Header from "@/app/components/Header";
import QRCodeUser from "./components/QRCodeUser";
import { useState } from "react";
import YellowPrimary from "@/app/components/Links/YellowPrimary";
import ButtonYellowPrimary from "@/app/components/Buttons/YellowPrimary";
import MeusCupons from "./components/MeusCupons";
import CuponsPorEmpresa from "./components/CuponsPorEmpresa";

export default function User() {
  const [activeComponent, setActiveComponent] = useState("qrcode");
  const idUser = 2;

  const setActiveSection = (section: string) => {
    setActiveComponent(section);
  };

  return (
    <>
      <Header>
        <li>
          <ButtonYellowPrimary
            onClick={() => setActiveSection("qrcode")}
            content="Gerar QRCode"
          />
        </li>
        <li>
          <ButtonYellowPrimary
            onClick={() => setActiveSection("meusCupons")}
            content="Meus cupons"
          />
        </li>
        <li>
          <YellowPrimary content="Sair" url="/" />
        </li>
      </Header>
      <main className="relative z-10 h-screen">
        {activeComponent === "qrcode" && (
          <section className="h-full w-full">
            <QRCodeUser value={idUser} />
          </section>
        )}

        {activeComponent === "meusCupons" && (
          <section className="h-full w-full">
            <MeusCupons trigger={() => setActiveSection("cuponsPorEmpresa")} />
          </section>
        )}

        {activeComponent === "cuponsPorEmpresa" && (
          <section className="h-full w-full">
            <CuponsPorEmpresa />
          </section>
        )}
      </main>
    </>
  );
}
