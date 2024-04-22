"use client";

import { api } from "../../lib/axios";
import Image from "next/image";
import { destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Money,
  UserCircleGear,
  UserCircle,
} from "@phosphor-icons/react/dist/ssr";

import logo from "@public/logo.svg";
import logoMais1Cafe from "@public/mais1cafe.png";
import MenuHeader from "@/app/components/MenuHeader";

import { ClientIdProvider } from "@/app/contexts/ClientIdContext";

import { decodeToken } from "@/middleware";
import { ClientComponent } from "./components/client-components/clientComponents";
import { ClientProvider } from "@/app/contexts/ClientContext";
import { useState } from "react";
import { AdminComponent } from "./components/admin-components/adminComponents";

export default function Dashboard() {
  const router = useRouter();

  const [statusVisibilityAdminComponent, setStatusVisibilityAdminComponent] =
    useState("hidden");

  const [statusVisibilityClientComponent, setStatusVisibilityClientComponent] =
    useState("hidden");

  const cookies = parseCookies();
  const authToken = cookies.token;

  const token = decodeToken(authToken);

  async function getInfoAdmin() {
    if (token) {
      const { sub } = token;

      try {
        await api.get(`/admin/${sub}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
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

  function handleVisibilityAdminComponent() {
    if (statusVisibilityAdminComponent === "hidden") {
      setStatusVisibilityClientComponent("hidden");
      return setStatusVisibilityAdminComponent("");
    }

    return setStatusVisibilityAdminComponent("hidden");
  }

  function handleVisibilityClientComponent() {
    if (statusVisibilityClientComponent === "hidden") {
      setStatusVisibilityAdminComponent("hidden");
      return setStatusVisibilityClientComponent("");
    }

    return setStatusVisibilityClientComponent("hidden");
  }

  getInfoAdmin();

  return (
    <ClientIdProvider>
      <ClientProvider>
        <>
          <ToastContainer />
          <header className="flex justify-between items-center  relative z-10">
            <figure className="w-72 h-16">
              <Image
                src={logo}
                alt=""
                className="w-full h-full object-contain"
              />
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
                  onClick={() => {
                    return handleVisibilityClientComponent();
                  }}
                  className=" w-1/6 h-24 flex justify-center items-center gap-4 bg-yellow-brand-400 border-yellow-400 border-2 hover:bg-transparent  rounded-lg transition-all cursor-pointer text-black hover:text-white"
                >
                  <UserCircle size={40} />
                  <span>Área do Cliente</span>
                </button>

                <button
                  onClick={() => {
                    return handleVisibilityAdminComponent();
                  }}
                  className=" w-1/6 h-24 flex justify-center items-center gap-4 bg-yellow-brand-400 border-yellow-400 border-2 hover:bg-transparent  rounded-lg transition-all cursor-pointer text-black hover:text-white"
                >
                  <UserCircleGear size={40} />
                  <span>Área do Colaborador</span>
                </button>

                <button className=" w-1/6 h-24 flex justify-center items-center gap-4 bg-yellow-brand-400 border-yellow-400 border-2 hover:bg-transparent  rounded-lg transition-all cursor-pointer text-black hover:text-white">
                  <Money size={40} />
                  <span>Gerenciar Planos</span>
                </button>
              </div>

              <section>
                <ClientComponent
                  visibilityClientComponent={statusVisibilityClientComponent}
                />

                <AdminComponent
                  visibilityAdminComponent={statusVisibilityAdminComponent}
                />
              </section>
            </section>
          </main>
        </>
      </ClientProvider>
    </ClientIdProvider>
  );
}
