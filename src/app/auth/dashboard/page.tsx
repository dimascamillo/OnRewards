"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "react-modal";

import { Warning } from "@phosphor-icons/react/dist/ssr";

import {
  List,
  X,
  UserCirclePlus,
  CreditCard,
} from "@phosphor-icons/react/dist/ssr";

import logoMais1Cafe from "@public/mais1cafe.png";
import MyClientsList from "./MyClientsList";

export default function Dashboard() {
  const [widthMenu, setWidthMenu] = useState("w-20");
  const [iconMenu, setIconMenu] = useState(true);
  const [visibilityIconsMenu, setVisibilityIconsMenu] = useState("hidden");
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <main className="flex items-start flex-wrap">
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

      <section className="w-4/5 p-5">
        <div className="flex gap-4">
          <button
            onClick={openModal}
            className=" w-1/6 h-24 flex justify-center items-center gap-4 bg-yellow-brand-400 border-yellow-400 border-2 hover:bg-transparent  rounded-lg transition-all cursor-pointer text-black hover:text-white"
          >
            <UserCirclePlus size={40} />
            <span>Associar cliente</span>
          </button>

          <button className=" w-1/6 h-24 flex justify-center items-center gap-4 bg-yellow-brand-400 border-yellow-400 border-2 hover:bg-transparent  rounded-lg transition-all cursor-pointer text-black hover:text-white">
            <CreditCard size={40} />
            <span>Criar Produto</span>
          </button>
        </div>

        <MyClientsList />
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Novo Usuário Modal"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-brand-600 rounded-lg 
        shadow-lg w-1/3 h-1/3"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <button onClick={closeModal}>
          <X size={15} className="absolute right-7" />
        </button>
        <h2 className="text-2xl mb-4">Digite o CPF do Cliente</h2>
        <div>
          <input
            type="text"
            className="mb-6 p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Digite o CPF do Cliente"
          />
          <span className="text-red-600 mb-6 flex items-center gap-2">
            <Warning size={25} />
            Cliente não encontrado.
          </span>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white transition-all w-28 h-12 rounded-lg">
          Associar
        </button>
      </Modal>
    </main>
  );
}
