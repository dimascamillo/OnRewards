"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../lib/axios";
import Image from "next/image";
import Modal from "react-modal";
import { destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  List,
  X,
  UserCirclePlus,
  CreditCard,
  Money,
  UserCircleGear,
  Warning,
  PencilSimple,
} from "@phosphor-icons/react/dist/ssr";

import logo from "@public/logo.svg";
import logoMais1Cafe from "@public/mais1cafe.png";
import MenuHeader from "@/app/components/MenuHeader";
import CreateNewClientForm from "./components/createNewClientForm";
import CreateNewAdminForm from "./components/createNewAdminForm";
import CreateNewPlanForm from "./components/createNewPlanForm";
import EditClient from "./components/editClient";
import { ClientIdProvider } from "@/app/contexts/ClientContext";
import { NextPage } from "next";

export default function Dashboard() {
  const [msgValidationCreateCliente, setMsgValidationCreateCliente] =
    useState("");

  const [widthMenu, setWidthMenu] = useState("w-20");

  const [iconMenu, setIconMenu] = useState(true);

  const [visibilityIconsMenu, setVisibilityIconsMenu] = useState("hidden");

  const [visibilityEditClient, setVisibilityEditClient] = useState("hidden");

  const [modalIsOpenPlan, setModalIsOpenPlan] = useState(false);
  const [modalIsOpenClient, setModalIsOpenClient] = useState(false);
  const [modalIsOpenAdmin, setModalIsOpenAdmin] = useState(false);

  const router = useRouter();

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

  function handleLagoutClient() {
    destroyCookie(null, "token", { path: "/" });
    destroyCookie(null, "userType", { path: "/" });
    router.push("/auth/sign-in");
  }

  function openModalClient() {
    setModalIsOpenClient(true);
  }

  function closeModalClient() {
    setModalIsOpenClient(false);
  }

  function openModalPlan() {
    setModalIsOpenPlan(true);
  }

  function closeModalPlan() {
    setModalIsOpenPlan(false);
  }

  function openModalAdmin() {
    setModalIsOpenAdmin(true);
  }

  function closeModalAdmin() {
    setModalIsOpenAdmin(false);
  }

  function handleEditClientVisibility() {
    if (visibilityEditClient === "hidden") {
      setVisibilityEditClient("");
    } else {
      setVisibilityEditClient("hidden");
    }
  }

  return (
    <ClientIdProvider>
      <>
        <ToastContainer />
        <header className="flex justify-between items-center p-5 relative z-10">
          <figure className="w-72 h-16">
            <Image src={logo} alt="" className="w-full h-full object-contain" />
          </figure>

          <MenuHeader logoutMethod={handleLagoutClient} />
        </header>
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

          <section className="w-full p-5 relative z-10">
            <div className="flex gap-4">
              <button
                onClick={openModalClient}
                className=" w-1/6 h-24 flex justify-center items-center gap-4 bg-yellow-brand-400 border-yellow-400 border-2 hover:bg-transparent  rounded-lg transition-all cursor-pointer text-black hover:text-white"
              >
                <UserCirclePlus size={40} />
                <span>Criar Cliente</span>
              </button>

              <button
                onClick={openModalPlan}
                className=" w-1/6 h-24 flex justify-center items-center gap-4 bg-yellow-brand-400 border-yellow-400 border-2 hover:bg-transparent  rounded-lg transition-all cursor-pointer text-black hover:text-white"
              >
                <Money size={40} />
                <span>Criar Plano</span>
              </button>

              <button
                onClick={openModalAdmin}
                className=" w-1/6 h-24 flex justify-center items-center gap-4 bg-yellow-brand-400 border-yellow-400 border-2 hover:bg-transparent  rounded-lg transition-all cursor-pointer text-black hover:text-white"
              >
                <UserCircleGear size={40} />
                <span>Criar Admin</span>
              </button>

              <button
                onClick={handleEditClientVisibility}
                className=" w-1/6 h-24 flex justify-center items-center gap-4 bg-yellow-brand-400 border-yellow-400 border-2 hover:bg-transparent  rounded-lg transition-all cursor-pointer text-black hover:text-white"
              >
                <PencilSimple size={40} />
                <span>Editar Cliente</span>
              </button>
            </div>

            <CreateNewClientForm
              modalIsOpenClient={modalIsOpenClient}
              closeModalClient={closeModalClient}
            />

            <CreateNewAdminForm
              closeModalAdmin={closeModalAdmin}
              modalIsOpenAdmin={modalIsOpenAdmin}
            />

            <CreateNewPlanForm
              closeModalPlan={closeModalPlan}
              modalIsOpenPlan={modalIsOpenPlan}
            />

            <EditClient visibility={visibilityEditClient} />
          </section>
        </main>
      </>
    </ClientIdProvider>
  );
}
