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

import { Warning } from "@phosphor-icons/react/dist/ssr";

import {
  List,
  X,
  UserCirclePlus,
  CreditCard,
} from "@phosphor-icons/react/dist/ssr";

import logo from "@public/logo.svg";
import logoMais1Cafe from "@public/mais1cafe.png";
import MyClientsList from "./MyClientsList";
import MenuHeader from "@/app/components/MenuHeader";

const productFormSchema = z.object({
  name: z.string(),
  cycle: z.number(),
  description: z.string(),
});

const newManagerFormSchema = z.object({
  name: z.string(),
  type: z.string(),
  cpf: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type ProductFormSchema = z.infer<typeof productFormSchema>;

type ManagerFormSchema = z.infer<typeof newManagerFormSchema>;
export default function Dashboard() {
  const [widthMenu, setWidthMenu] = useState("w-20");
  const [iconMenu, setIconMenu] = useState(true);
  const [visibilityIconsMenu, setVisibilityIconsMenu] = useState("hidden");
  const [modalIsOpenProduct, setModalIsOpenProduct] = useState(false);
  const [modalIsOpenManager, setModalIsOpenManager] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();

  const {
    register: registerProduct,
    handleSubmit: handleSubmitProduct,
    formState: { errors: errorsProduct, isSubmitting: isSubmittingProduct },
    reset: resetProduct,
  } = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchema),
  });

  const {
    register: registerManager,
    setValue,
    handleSubmit: handleSubmitManager,
    formState: { errors: errorsManager, isSubmitting: isSubmittingManager },
    reset: resetManager,
  } = useForm<ManagerFormSchema>({
    resolver: zodResolver(newManagerFormSchema),
    defaultValues: {
      type: "2",
    },
  });

  async function handleCreateProduct(data: ProductFormSchema) {
    const { name, cycle, description } = data;
    const cookies = parseCookies();
    const authToken = cookies.token;

    try {
      const response = await api.post(
        "/products",
        {
          name,
          cycle,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      toast.success("Produto criado com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      resetProduct();
    } catch (err: any) {
      console.error(err.message);
    }
  }

  async function handleCreateManager(data: ManagerFormSchema) {
    const { name, cpf, type, email, password } = data;
    const cookies = parseCookies();
    const authToken = cookies.token;

    try {
      const response = await api.post(
        "/managers",
        {
          name,
          cpf,
          type,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      toast.success("Gerente criado com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      resetManager();
    } catch (err: any) {
      console.error(err.message);
    }
  }

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
    router.push("/auth/sign-in");
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function openModalProduct() {
    setModalIsOpenProduct(true);
  }

  function closeModalProduct() {
    setModalIsOpenProduct(false);
  }

  function openModalManager() {
    setModalIsOpenManager(true);
  }

  function closeModalManager() {
    setModalIsOpenManager(false);
  }

  function formatCPF(cpf: string): string {
    const numericCPF = cpf.replace(/\D/g, "");
    return numericCPF.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  }

  return (
    <>
      <ToastContainer />
      <header className="flex justify-between items-center p-5 relative z-10">
        <figure className="w-72 h-16">
          <a href="/auth/dashboard">
            <Image src={logo} alt="" className="w-full h-full object-contain" />
          </a>
        </figure>

        <MenuHeader logoutMethod={handleLagoutClient} />
      </header>
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

        <section className="w-4/5 p-5 relative z-10">
          <div className="flex gap-4">
            <button
              onClick={openModal}
              className=" w-1/6 h-24 flex justify-center items-center gap-4 bg-yellow-brand-400 border-yellow-400 border-2 hover:bg-transparent  rounded-lg transition-all cursor-pointer text-black hover:text-white"
            >
              <UserCirclePlus size={40} />
              <span>Associar cliente</span>
            </button>

            <button
              onClick={openModalProduct}
              className=" w-1/6 h-24 flex justify-center items-center gap-4 bg-yellow-brand-400 border-yellow-400 border-2 hover:bg-transparent  rounded-lg transition-all cursor-pointer text-black hover:text-white"
            >
              <CreditCard size={40} />
              <span>Criar Produto</span>
            </button>

            <button
              onClick={openModalManager}
              className=" w-1/6 h-24 flex justify-center items-center gap-4 bg-yellow-brand-400 border-yellow-400 border-2 hover:bg-transparent  rounded-lg transition-all cursor-pointer text-black hover:text-white"
            >
              <CreditCard size={40} />
              <span>Criar Gerente</span>
            </button>
          </div>

          <MyClientsList />

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Novo Usuário Modal"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-brand-600 rounded-lg 
    shadow-lg w-1/3 h-1/3 z-20"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-20"
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

          <Modal
            isOpen={modalIsOpenProduct}
            onRequestClose={closeModalProduct}
            contentLabel="Novo Usuário Modal"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-brand-600 rounded-lg 
          shadow-lg w-1/3 h-auto z-20"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-20"
          >
            <button onClick={closeModalProduct}>
              <X size={15} className="absolute right-7" />
            </button>
            <h2 className="text-2xl mb-4">Cadastre um novo Produto</h2>
            <form onSubmit={handleSubmitProduct(handleCreateProduct)}>
              <div>
                <label htmlFor="name">Nome do Produto</label>
                <input
                  type="text"
                  className="mb-6 p-2 border border-gray-300 text-black rounded-lg w-full"
                  placeholder="Digite o nome do Produto"
                  {...registerProduct("name")}
                />
              </div>

              <div>
                <label htmlFor="cycle">Clico do Produto</label>
                <input
                  type="number"
                  className="mb-6 p-2 border border-gray-300 text-black rounded-lg w-full"
                  placeholder="Digite o Clico do Produto"
                  {...registerProduct("cycle", {
                    valueAsNumber: true,
                  })}
                />
              </div>

              <div>
                <label htmlFor="description">Descrição do Produto</label>
                <textarea
                  className="mb-6 p-2 border border-gray-300 text-black rounded-lg w-full"
                  placeholder="Digite a descrição do Produto"
                  {...registerProduct("description")}
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white transition-all w-28 h-12 rounded-lg"
              >
                Criar
              </button>
            </form>
          </Modal>

          <Modal
            isOpen={modalIsOpenManager}
            onRequestClose={closeModalManager}
            contentLabel="Novo Usuário Modal"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-brand-600 rounded-lg 
          shadow-lg w-1/3 h-auto z-20"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-20"
          >
            <button onClick={closeModalManager}>
              <X size={15} className="absolute right-7" />
            </button>
            <h2 className="text-2xl mb-4">Cadastre um Gerente</h2>
            <form onSubmit={handleSubmitManager(handleCreateManager)}>
              <div>
                <label htmlFor="name">Nome do Gerente</label>
                <input
                  type="text"
                  className="mb-6 p-2 border border-gray-300 text-black rounded-lg w-full"
                  placeholder="Digite o nome do Gerente"
                  {...registerManager("name")}
                />
              </div>

              <div>
                <label htmlFor="cpf">CPF do Gerente</label>
                <input
                  type="text"
                  className="mb-6 p-2 border border-gray-300 text-black rounded-lg w-full"
                  placeholder="Digite o CPF do Gerente"
                  {...registerManager("cpf")}
                  onChange={(e) => {
                    const formattedCPF = formatCPF(e.target.value);
                    setValue("cpf", formattedCPF);
                  }}
                />
              </div>

              <div>
                <label htmlFor="email">E-mail do Gerente</label>
                <input
                  type="email"
                  className="mb-6 p-2 border border-gray-300 text-black rounded-lg w-full"
                  placeholder="Digite o E-mail do Gerente"
                  {...registerManager("email")}
                />
              </div>

              <div className="hidden">
                <label htmlFor="type">Tipo de Conta</label>
                <input
                  type="text"
                  className="mb-6 p-2 border border-gray-300 text-black rounded-lg w-full"
                  placeholder="Digite o CPF do Gerente"
                  {...registerManager("type")}
                />
              </div>

              <div>
                <label htmlFor="password">Digite a Senha do Gerente</label>
                <input
                  type="password"
                  className="mb-6 p-2 border border-gray-300 text-black rounded-lg w-full"
                  placeholder="Digite a Senha do Gerente"
                  {...registerManager("password")}
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white transition-all w-28 h-12 rounded-lg"
              >
                Criar
              </button>
            </form>
          </Modal>
        </section>
      </main>
    </>
  );
}
