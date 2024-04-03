import { api } from "@/app/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import Modal from "react-modal";

import { X } from "@phosphor-icons/react/dist/ssr";
import useFormatCNPJ from "@/app/hooks/useFormatCnpj";
import { parseCookies } from "nookies";
import { decodeToken } from "@/middleware";
import { useClientId } from "@/app/contexts/ClientContext";

const editClientFormSchema = z.object({
  id: z.string().optional(),
  cnpj: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
});

const infoPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
});

type EditClientProps = {
  closeModalClient: () => void;
  modalIsOpenClient: boolean;
  getcnpj: string;
  getname: string;
  getemail: string;
};

export type EditClientFormSchema = z.infer<typeof editClientFormSchema>;

type InfoPlanSchema = z.infer<typeof infoPlanSchema>;

export default function EditClientModal({
  closeModalClient,
  modalIsOpenClient,
  getcnpj,
  getname,
  getemail,
}: EditClientProps) {
  const [choseMethodClient, setChoseMethodClient] = useState(false);

  const cookies = parseCookies();
  const authToken = cookies.token;

  const { clientId } = useClientId();

  const {
    register: registerUpdateClient,
    handleSubmit: handleSubmitUpdateClient,
    formState: { errors, isSubmitting },
    reset: resetUpdateClient,
    setValue: setValueUpdateClient,
  } = useForm<EditClientFormSchema>({
    resolver: zodResolver(editClientFormSchema),
  });

  async function handleUpdateClient(data: EditClientFormSchema) {
    const { id, cnpj, name, email, password } = data;

    const cookies = parseCookies();
    const authToken = cookies.token;

    if (!choseMethodClient) {
      try {
        await api.patch(
          `/updateClient/${clientId}`,
          {
            cnpj,
            name,
            email,
            password,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        toast.success("Client editado com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        resetUpdateClient();
        closeModalClient();
      } catch (err: any) {
        console.error(err.message);
      }
    }

    if (choseMethodClient) {
      try {
        await api.delete(`/client/${clientId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        toast.success("Cliente excluído com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        resetUpdateClient();
        closeModalClient();
      } catch (err: any) {
        console.error(err.message);
      }
    }
  }

  setValueUpdateClient("cnpj", getcnpj);
  setValueUpdateClient("name", getname);
  setValueUpdateClient("email", getemail);

  function changevalueMethodToFalse() {
    setChoseMethodClient(false);
  }

  function changevalueMethodToTrue() {
    setChoseMethodClient(true);
  }

  return (
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
      <h2 className="text-2xl mb-4">Editiar Cliente</h2>
      <form onSubmit={handleSubmitUpdateClient(handleUpdateClient)}>
        <div>
          <label htmlFor="cnpjClient">CNPJ do Cliente</label>
          <input
            type="text"
            className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full cursor-not-allowed"
            placeholder="Digite o CNPJ do Cliente"
            maxLength={18}
            disabled
            {...registerUpdateClient("cnpj")}
          />
        </div>

        <div>
          <label htmlFor="nameClient">Nome do Cliente</label>
          <input
            type="text"
            className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Digite o Nome do Cliente"
            {...registerUpdateClient("name")}
          />
        </div>

        <div>
          <label htmlFor="emailClient">E-mail do Cliente</label>
          <input
            type="email"
            className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Digite o E-mail do Cliente"
            {...registerUpdateClient("email")}
          />
        </div>

        <div>
          <label htmlFor="passwordClient">Password do Cliente</label>
          <input
            type="password"
            className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Digite a Senha do Cliente"
            {...registerUpdateClient("password")}
          />
        </div>

        <footer className="flex justify-start items-center gap-3">
          <button
            type="submit"
            onClick={changevalueMethodToFalse}
            className="bg-green-500 hover:bg-green-600 text-white transition-all w-28 h-12 rounded-lg"
          >
            Editar
          </button>

          <button
            type="submit"
            onClick={changevalueMethodToTrue}
            className="bg-red-500 hover:bg-red-600 text-white transition-all w-28 h-12 rounded-lg"
          >
            Excluir
          </button>
        </footer>
      </form>
    </Modal>
  );
}
