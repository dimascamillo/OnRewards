import { api } from "@/app/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import Modal from "react-modal";

import { X } from "@phosphor-icons/react/dist/ssr";
import { ListClientsContext } from "@/app/contexts/ListClientsContext";
import { useContext } from "react";

const newClientFormSchema = z.object({
  cnpj: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
});

type NewClientProps = {
  closeModalClient: () => void;
  modalIsOpenClient: boolean;
};

export type NewClientFormSchema = z.infer<typeof newClientFormSchema>;

export default function NewClientModal({
  closeModalClient,
  modalIsOpenClient,
}: NewClientProps) {
  const { updateClientsList } = useContext(ListClientsContext);

  const {
    register: registerUpdateClient,
    handleSubmit: handleSubmitUpdateClient,
    formState: { errors, isSubmitting },
    reset: resetUpdateClient,
  } = useForm<NewClientFormSchema>({
    resolver: zodResolver(newClientFormSchema),
  });

  async function handleUpdateClient(data: NewClientFormSchema) {
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

      updateClientsList();
      resetUpdateClient();
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        msgErrorCreateClient("E=mail ou CNPJ já cadastrado.");
      } else if (err.response && err.response.status === 400) {
        msgErrorCreateClient("Todos os campos são obrigatórios");
      } else if (err.response && err.response.status === 400) {
        msgErrorCreateClient("A senha deve ter pelo menos 8 caracteres.");
      } else {
        msgErrorCreateClient(err.message);
        console.error(errors);
      }
    }
  }

  function msgErrorCreateClient(msg: string) {
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
            className="bg-green-500 hover:bg-green-600 text-white transition-all w-28 h-12 rounded-lg"
            disabled={isSubmitting}
          >
            Cadastrar
          </button>
        </footer>
      </form>
    </Modal>
  );
}
