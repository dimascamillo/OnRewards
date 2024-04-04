import { api } from "@/app/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import Modal from "react-modal";

import { X } from "@phosphor-icons/react/dist/ssr";
import useFormatCNPJ from "@/app/hooks/useFormatCnpj";

const newClientFormSchema = z.object({
  cnpj: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type NewClientFormSchema = z.infer<typeof newClientFormSchema>;

export default function CreateNewClientForm() {
  const [msgValidationCreateCliente, setMsgValidationCreateCliente] =
    useState("");

  const formatCNPJ = useFormatCNPJ();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<NewClientFormSchema>({
    resolver: zodResolver(newClientFormSchema),
  });

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

      reset();
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        msgErrorCreateClient("E=mail ou CNPJ já cadastrado.");
      } else if (err.response && err.response.status === 400) {
        msgErrorCreateClient("Todos os campos são obrigatórios");
      } else if (err.response && err.response.status === 400) {
        msgErrorCreateClient("A senha deve ter pelo menos 8 caracteres.");
      } else {
        msgErrorCreateClient(err.message);
        console.error(err.message);
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
    <div>
      <h2 className="text-2xl my-10">Cadastrar Novo Cliente</h2>
      <form
        onSubmit={handleSubmit(handleCreateClient)}
        className="flex items-center gap-5"
      >
        <div>
          <label htmlFor="cnpjClient">CNPJ do Cliente</label>
          <input
            type="text"
            className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Digite o CNPJ do Cliente"
            {...register("cnpj")}
            onChange={(e) => {
              const formattedCNPJ = formatCNPJ(e.target.value);
              setValue("cnpj", formattedCNPJ);
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

        <button
          type="submit"
          className="bg-green-700 hover:bg-green-600 text-white transition-all w-28 h-12 rounded-lg"
        >
          Criar
        </button>
      </form>
    </div>
  );
}
