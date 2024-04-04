import { api } from "@/app/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import useFormatCPF from "@/app/hooks/useFormatCpf";
import { parseCookies } from "nookies";

const newAdminFormSchema = z.object({
  name: z.string(),
  cpf: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type NewAdminFormSchema = z.infer<typeof newAdminFormSchema>;

export default function CreateNewAdminForm() {
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
    } catch {
      console.error(errors);
    }
  }

  return (
    <div>
      <h2 className="text-2xl my-10">Cadastrar Novo Colaborador</h2>
      <form
        onSubmit={handleSubmit(handleCreateAdmin)}
        className="flex items-center gap-5"
      >
        <div>
          <label htmlFor="cnpjClient">CPF do Colaborador</label>
          <input
            type="text"
            className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Digite o CPF do Colaborador"
            {...register("cpf")}
            onChange={(e) => {
              const formattedCPF = formatCPF(e.target.value);
              setValue("cpf", formattedCPF);
            }}
            maxLength={18}
          />
        </div>

        <div>
          <label htmlFor="nameClient">Nome do Colaborador</label>
          <input
            type="text"
            className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Digite o Nome do Colaborador"
            {...register("name")}
          />
        </div>

        <div>
          <label htmlFor="emailClient">E-mail do Colaborador</label>
          <input
            type="email"
            className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Digite o E-mail do Colaborador"
            {...register("email")}
          />
        </div>

        <div>
          <label htmlFor="passwordClient">Password do Colaborador</label>
          <input
            type="password"
            className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Digite a Senha do Colaborador"
            {...register("password")}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-700 hover:bg-green-600 text-white transition-all w-28 h-12 rounded-lg"
        >
          Criar
        </button>
      </form>
    </div>
  );
}
