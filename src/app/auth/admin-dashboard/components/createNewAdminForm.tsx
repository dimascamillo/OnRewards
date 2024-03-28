import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useFormatCPF from "@/app/hook/useFormatCpf";

import { X } from "@phosphor-icons/react/dist/ssr";
import { parseCookies } from "nookies";
import { api } from "@/app/lib/axios";
import { toast } from "react-toastify";

const newAdminFormSchema = z.object({
  name: z.string(),
  cpf: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type NewAdminFormSchema = z.infer<typeof newAdminFormSchema>;

type NewAdminProps = {
  closeModalAdmin: () => void;
  modalIsOpenAdmin: boolean;
};

export default function CreateNewAdminForm({
  modalIsOpenAdmin,
  closeModalAdmin,
}: NewAdminProps) {
  const formatCPF = useFormatCPF();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<NewAdminFormSchema>({
    resolver: zodResolver(newAdminFormSchema),
  });

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

      reset();
    } catch (err: any) {
      console.error(err.message);
    }
  }

  return (
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
      <form onSubmit={handleSubmit(handleCreateAdmin)}>
        <div>
          <label htmlFor="cpfClient">CPF do Admin</label>
          <input
            type="text"
            className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Digite o CPF do Admin"
            {...register("cpf")}
            onChange={(e) => {
              const formattedCPF = formatCPF(e.target.value);
              setValue("cpf", formattedCPF);
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
            {...register("name")}
          />
        </div>

        <div>
          <label htmlFor="emailClient">E-mail do Admin</label>
          <input
            type="email"
            className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Digite o E-mail do Admin"
            {...register("email")}
          />
        </div>

        <div>
          <label htmlFor="passwordClient">Password do Admin</label>
          <input
            type="password"
            className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Digite a Senha do Admin"
            {...register("password")}
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
  );
}
