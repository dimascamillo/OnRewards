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
import CreateNewAdminForm from "./components/admin-components/createNewAdminForm";
import CreateNewPlanForm from "./components/plan-components/createNewPlanForm";
import { ClientIdProvider } from "@/app/contexts/ClientContext";
import { NextPage } from "next";
import { AdminProvider, useAdmin } from "@/app/contexts/AdminContext";
import { decodeToken } from "@/middleware";
import { AdminComponent } from "./components/client-components/adminComponents";

export default function Dashboard() {
  const [visibilityEditClient, setVisibilityEditClient] = useState("hidden");

  const [modalIsOpenPlan, setModalIsOpenPlan] = useState(false);
  const [modalIsOpenClient, setModalIsOpenClient] = useState(false);
  const [modalIsOpenAdmin, setModalIsOpenAdmin] = useState(false);

  const router = useRouter();

  const { id, name, setId, setName, setCpf, setEmail } = useAdmin();

  const cookies = parseCookies();
  const authToken = cookies.token;

  const token = decodeToken(authToken);

  async function getInfoAdmin() {
    if (token) {
      const { sub } = token;

      try {
        const response = await api.get(`/admin/${sub}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setId(response.data.id);
        setName(response.data.name);
        setCpf(response.data.cpf);
        setEmail(response.data.email);
      } catch (err: any) {
        console.error(err);
      }
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

  getInfoAdmin();

  return (
    <ClientIdProvider>
      <>
        <ToastContainer />
        <header className="flex justify-between items-center  relative z-10">
          <figure className="w-72 h-16">
            <Image src={logo} alt="" className="w-full h-full object-contain" />
          </figure>

          <div className="flex items-center gap-20 p-10">
            <div className="flex items-center gap-5">
              <figure className="w-16 h-16 border-white">
                <Image
                  src={logoMais1Cafe}
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </figure>
              <span>Dimas Camillo Felippe de Sá e Silva</span>
            </div>

            <MenuHeader logoutMethod={handleLagoutClient} />
          </div>
        </header>
        <main className="h-full">
          <section className="w-full p-5 relative z-10">
            <div className="flex gap-4">
              <button
                onClick={openModalClient}
                className=" w-1/6 h-24 flex justify-center items-center gap-4 bg-yellow-brand-400 border-yellow-400 border-2 hover:bg-transparent  rounded-lg transition-all cursor-pointer text-black hover:text-white"
              >
                <UserCirclePlus size={40} />
                <span>Área do Cliente</span>
              </button>

              <button
                onClick={openModalAdmin}
                className=" w-1/6 h-24 flex justify-center items-center gap-4 bg-yellow-brand-400 border-yellow-400 border-2 hover:bg-transparent  rounded-lg transition-all cursor-pointer text-black hover:text-white"
              >
                <UserCircleGear size={40} />
                <span>Área do Admin</span>
              </button>

              <button
                onClick={openModalPlan}
                className=" w-1/6 h-24 flex justify-center items-center gap-4 bg-yellow-brand-400 border-yellow-400 border-2 hover:bg-transparent  rounded-lg transition-all cursor-pointer text-black hover:text-white"
              >
                <Money size={40} />
                <span>Gerenciar Planos</span>
              </button>
            </div>

            <section>
              <AdminComponent />
            </section>
          </section>
        </main>
      </>
    </ClientIdProvider>
  );
}
