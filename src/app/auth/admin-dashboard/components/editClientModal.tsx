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

const editClientFormSchema = z.object({
  cnpj: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  plan: z.string(),
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<EditClientFormSchema>({
    resolver: zodResolver(editClientFormSchema),
  });

  async function handleUpdateClient(data: EditClientFormSchema) {
    const { name, email, password, plan } = data;

    const cookies = parseCookies();
    const authToken = cookies.token;

    try {
      await api.patch(
        "/att/client",
        {
          name,
          email,
          password,
          plan, // Certifique-se de incluir o plano na requisição, se necessário
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

      reset();
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

  setValue("cnpj", getcnpj);
  setValue("name", getname);
  setValue("email", getemail);

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
      <form onSubmit={handleSubmit(handleUpdateClient)}>
        <div>
          <label htmlFor="cnpjClient">CNPJ do Cliente</label>
          <input
            type="text"
            className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full cursor-not-allowed"
            placeholder="Digite o CNPJ do Cliente"
            maxLength={18}
            disabled
            {...register("cnpj")}
          />
        </div>

        <div>
          <label htmlFor="nameClient">Nome do Cliente</label>
          <input
            type="text"
            className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Digite o Nome do Cliente"
            {...register("name")}
          />
        </div>

        <div>
          <label htmlFor="emailClient">E-mail do Cliente</label>
          <input
            type="email"
            className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Digite o E-mail do Cliente"
            {...register("email")}
          />
        </div>

        <div>
          <label htmlFor="passwordClient">Password do Cliente</label>
          <input
            type="password"
            className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Digite a Senha do Cliente"
            {...register("password")}
          />
        </div>

        <div>
          <label htmlFor="plans">Selecione o Plano</label>
          <select
            className="w-full my-4 p-2 text-black font-bold"
            {...register("plan")}
          >
            <option value="">Selecione um Plano</option>
            {plans.map((plan: InfoPlanSchema) => {
              return (
                <option className="p-3" key={plan.id} value={plan.name}>
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
