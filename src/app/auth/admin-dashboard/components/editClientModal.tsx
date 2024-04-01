import { api } from "@/app/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import Modal from "react-modal";

import { X } from "@phosphor-icons/react/dist/ssr";
import useFormatCNPJ from "@/app/hook/useFormatCnpj";
import { parseCookies } from "nookies";
import { decodeToken } from "@/middleware";
import { useClientId } from "@/app/contexts/ClientContext";

const editClientFormSchema = z.object({
  cnpj: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  planId: z.string(),
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
  const formatCNPJ = useFormatCNPJ();
  const [plans, setPlans] = useState([]);

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
    const { name, email, password, planId } = data;

    const cookies = parseCookies();
    const authToken = cookies.token;

    try {
      await api.put(
        `/updateClient/${clientId}`,
        {
          name,
          email,
          password,
          planId: clientId,
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
    } catch (err: any) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get("/getAllPlans", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setPlans(response.data);
      } catch (error) {
        console.error("Erro ao buscar Planos:", error);
      }
    };

    fetchPlans();
  }, [authToken]);

  setValueUpdateClient("cnpj", getcnpj);
  setValueUpdateClient("name", getname);
  setValueUpdateClient("email", getemail);

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

        <div>
          <label htmlFor="plans">Selecione o Plano</label>
          <select
            className="w-full my-4 p-2 text-black font-bold"
            {...registerUpdateClient("planId")}
          >
            <option value="">Selecione um Plano</option>
            {plans.map((plan: InfoPlanSchema) => {
              return (
                <option className="p-3" key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              );
            })}
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white transition-all w-28 h-12 rounded-lg"
        >
          Criar
        </button>
      </form>
    </Modal>
  );
}
