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
} from "@phosphor-icons/react/dist/ssr";

import logo from "@public/logo.svg";
import logoMais1Cafe from "@public/mais1cafe.png";
import MenuHeader from "@/app/components/MenuHeader";

const newClientFormSchema = z.object({
  cnpj: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const newPlanFormSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

const newAdminFormSchema = z.object({
  name: z.string(),
  cpf: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type NewPlanFormSchema = z.infer<typeof newPlanFormSchema>;

type NewClientFormSchema = z.infer<typeof newClientFormSchema>;

type NewAdminFormSchema = z.infer<typeof newAdminFormSchema>;

export default function Dashboard() {
  const [msgValidationCreateCliente, setMsgValidationCreateCliente] =
    useState("");

  const [widthMenu, setWidthMenu] = useState("w-20");
  const [iconMenu, setIconMenu] = useState(true);
  const [visibilityIconsMenu, setVisibilityIconsMenu] = useState("hidden");

  const [modalIsOpenPlan, setModalIsOpenPlan] = useState(false);
  const [modalIsOpenClient, setModalIsOpenClient] = useState(false);
  const [modalIsOpenAdmin, setModalIsOpenAdmin] = useState(false);

  const router = useRouter();

  const {
    register: registerClient,
    handleSubmit: handleSubmitClient,
    formState: { errors: errorsClient, isSubmitting: isSubmittingClient },
    reset: resetClient,
    setValue: setValueClient,
  } = useForm<NewClientFormSchema>({
    resolver: zodResolver(newClientFormSchema),
  });

  const {
    register: registerPlan,
    handleSubmit: handleSubmitPlan,
    formState: { errors: errorsPlan, isSubmitting: isSubmittingPlan },
    reset: resetPlan,
  } = useForm<NewPlanFormSchema>({
    resolver: zodResolver(newPlanFormSchema),
  });

  const {
    register: registerAdmin,
    handleSubmit: handleSubmitAdmin,
    formState: { errors: errorsAdmin, isSubmitting: isSubmittingAdmin },
    reset: resetAdmin,
    setValue: setValueAdmin,
  } = useForm<NewAdminFormSchema>({
    resolver: zodResolver(newAdminFormSchema),
  });

  async function handleCreatePlan(data: NewPlanFormSchema) {
    const { name, description } = data;
    const cookies = parseCookies();
    const authToken = cookies.token;

    try {
      const response = await api.post(
        "/plans",
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      toast.success("Plano criado com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      resetPlan();
    } catch (err: any) {
      console.error(err.message);
    }
  }

  async function handleCreateClient(data: NewClientFormSchema) {
    const { cnpj, name, email, password } = data;

    try {
      await api.post("/clients", {
        cnpj,
        name,
        email,
        password,
      });

      toast.success("Client criado com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      resetClient();
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        setMsgValidationCreateCliente("E=mail ou CNPJ já cadastrado.");
      } else if (err.response && err.response.status === 400) {
        setMsgValidationCreateCliente("Todos os campos são obrigatórios");
      } else if (err.response && err.response.status === 400) {
        setMsgValidationCreateCliente(
          "A senha deve ter pelo menos 8 caracteres."
        );
      } else {
        console.error(err.message);
      }
    }
  }

  async function handleCreateAdmin(data: NewAdminFormSchema) {
    const { cpf, name, email, password } = data;

    const cookies = parseCookies();
    const authToken = cookies.token;

    try {
      await api.post(
        "/admins",
        {
          name,
          cpf,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      toast.success("Admin criado com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      resetAdmin();
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

  function formatCPF(cpf: string): string {
    const numericCPF = cpf.replace(/\D/g, "");
    return numericCPF.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  }

  function formatCNPJ(cnpj: string): string {
    const numericCNPJ = cnpj.replace(/\D/g, "");
    return numericCNPJ.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
  }

  return (
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
          </div>

          <Modal
            isOpen={modalIsOpenClient}
            onRequestClose={closeModalClient}
            contentLabel="Novo Cliente Modal"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-brand-600 rounded-lg 
    shadow-lg w-1/3 h-auto z-20"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-20"
          >
            <button onClick={closeModalClient}>
              <X size={15} className="absolute right-7" />
            </button>
            <h2 className="text-2xl mb-4">Cadastrar Novo Cliente</h2>
            <form onSubmit={handleSubmitClient(handleCreateClient)}>
              <div>
                <label htmlFor="cnpjClient">CNPJ do Cliente</label>
                <input
                  type="text"
                  className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full"
                  placeholder="Digite o CNPJ do Cliente"
                  {...registerClient("cnpj")}
                  onChange={(e) => {
                    const formattedCNPJ = formatCNPJ(e.target.value);
                    setValueClient("cnpj", formattedCNPJ);
                  }}
                  maxLength={18}
                />
              </div>

              <div>
                <label htmlFor="nameClient">Nome do Cliente</label>
                <input
                  type="text"
                  className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full"
                  placeholder="Digite o Nome do Cliente"
                  {...registerClient("name")}
                />
              </div>

              <div>
                <label htmlFor="emailClient">E-mail do Cliente</label>
                <input
                  type="email"
                  className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full"
                  placeholder="Digite o E-mail do Cliente"
                  {...registerClient("email")}
                />
              </div>

              <div>
                <label htmlFor="passwordClient">Password do Cliente</label>
                <input
                  type="password"
                  className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full"
                  placeholder="Digite a Senha do Cliente"
                  {...registerClient("password")}
                />
              </div>

              <div className="my-4">
                <span className="text-red-400 font-semibold w-full">
                  {msgValidationCreateCliente}
                </span>
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
            isOpen={modalIsOpenPlan}
            onRequestClose={closeModalPlan}
            contentLabel="Novo Plano Modal"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-brand-600 rounded-lg 
          shadow-lg w-1/3 h-auto z-20"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-20"
          >
            <button onClick={closeModalPlan}>
              <X size={15} className="absolute right-7" />
            </button>
            <h2 className="text-2xl mb-4">Cadastre um Novo Plano</h2>
            <form onSubmit={handleSubmitPlan(handleCreatePlan)}>
              <div>
                <label htmlFor="name">Nome do Plano</label>
                <input
                  type="text"
                  className="mb-6 p-2 border border-gray-300 text-black rounded-lg w-full"
                  placeholder="Digite o nome do Gerente"
                  {...registerPlan("name")}
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
            isOpen={modalIsOpenAdmin}
            onRequestClose={closeModalAdmin}
            contentLabel="Novo Admin Modal"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-brand-600 rounded-lg 
    shadow-lg w-1/3 h-auto z-20"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-20"
          >
            <button onClick={closeModalAdmin}>
              <X size={15} className="absolute right-7" />
            </button>
            <h2 className="text-2xl mb-4">Cadastrar Novo Admin</h2>
            <form onSubmit={handleSubmitAdmin(handleCreateAdmin)}>
              <div>
                <label htmlFor="cpfClient">CPF do Admin</label>
                <input
                  type="text"
                  className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full"
                  placeholder="Digite o CPF do Admin"
                  {...registerAdmin("cpf")}
                  onChange={(e) => {
                    const formattedCPF = formatCPF(e.target.value);
                    setValueAdmin("cpf", formattedCPF);
                  }}
                  maxLength={14}
                />
              </div>

              <div>
                <label htmlFor="nameClient">Nome do Admin</label>
                <input
                  type="text"
                  className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full"
                  placeholder="Digite o Nome do Admin"
                  {...registerAdmin("name")}
                />
              </div>

              <div>
                <label htmlFor="emailClient">E-mail do Admin</label>
                <input
                  type="email"
                  className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full"
                  placeholder="Digite o E-mail do Admin"
                  {...registerAdmin("email")}
                />
              </div>

              <div>
                <label htmlFor="passwordClient">Password do Admin</label>
                <input
                  type="password"
                  className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full"
                  placeholder="Digite a Senha do Admin"
                  {...registerAdmin("password")}
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
