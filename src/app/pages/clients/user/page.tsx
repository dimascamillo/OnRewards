"use client";

import Header from "@/app/components/Header";
import QRCodeUser from "./components/QRCodeUser";
import { useState } from "react";
import YellowPrimary from "@/app/components/Links/YellowPrimary";
import ButtonYellowPrimary from "@/app/components/Buttons/YellowPrimary";
import MeusCupons from "./components/MeusCupons";
import CuponsPorEmpresa from "./components/CuponsPorEmpresa";

export default function User() {
  const [QRCodeStatus, setQRCodeStatus] = useState(false);
  const [MeusCuponsStatus, setMeusCuponsStatus] = useState(true);

  const [CuponsPorEmpresaStatus, setCuponsPorEmpresaStatus] = useState(true);

  const idUser = 2;

  function setQRCodeUser() {
    setQRCodeStatus(false);
    setMeusCuponsStatus(true);
  }

  function setMeusCuponsUser() {
    setMeusCuponsStatus(false);
    setQRCodeStatus(true);
  }

  function setCuponsPorEmpresaStatusUser() {
    setCuponsPorEmpresaStatus(false);
    setMeusCuponsStatus(true);
    setQRCodeStatus(true);
  }

  return (
    <>
      <Header>
        <li>
          <ButtonYellowPrimary onClick={setQRCodeUser} content="Gerar QRCode" />
        </li>
        <li>
          <ButtonYellowPrimary
            onClick={setMeusCuponsUser}
            content="Meus cupons"
          />
        </li>
        <li>
          <YellowPrimary content="Sair" url="/" />
        </li>
      </Header>
      <main className="relative z-10 h-screen">
        <section className="h-full w-full" hidden={QRCodeStatus}>
          <QRCodeUser value={idUser} />
        </section>

        <section className="h-full w-full" hidden={MeusCuponsStatus}>
          <MeusCupons trigger={setCuponsPorEmpresaStatusUser} />
        </section>

        <section className="h-full w-full" hidden={CuponsPorEmpresaStatus}>
          <CuponsPorEmpresa />
        </section>
      </main>
    </>
  );
}
