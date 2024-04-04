import { api } from "@/app/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import Modal from "react-modal";

import { X } from "@phosphor-icons/react/dist/ssr";
import { parseCookies } from "nookies";

const editAdminFormSchema = z.object({
  id: z.string().optional(),
  cpf: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
});

type EditAdminProps = {
  closeModalAdmin: () => void;
  modalIsOpenAdmin: boolean;
  getcpf: string;
  getname: string;
  getemail: string;
};

export type EditAdminFormSchema = z.infer<typeof editAdminFormSchema>;

export default function EditAdminModal({
  closeModalAdmin,
  modalIsOpenAdmin,
  getcpf,
  getname,
  getemail,
}: EditAdminProps) {
  const [choseMethodAdmin, setChoseMethodAdmin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<EditAdminFormSchema>({
    resolver: zodResolver(editAdminFormSchema),
  });

  async function handleUpdateAdmin(data: EditAdminFormSchema) {
    const { cpf, name, email, password } = data;

    const cookies = parseCookies();
    const authToken = cookies.token;

    if (!choseMethodAdmin) {
      try {
        await api.patch(
          `/updateAdmin/${adminId}`,
          {
            cpf,
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

        toast.success("Colaborador editado com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        reset();
        closeModalAdmin();
      } catch (err: any) {
        console.error(err.message);
      }
    }

    if (choseMethodAdmin) {
      try {
        await api.delete(`/client/${adminId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        toast.success("Colaborador excluído com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        reset();
        closeModalAdmin();
      } catch {
        console.error(errors);
      }
    }
  }

  setValue("cpf", getcpf);
  setValue("name", getname);
  setValue("email", getemail);

  function changevalueMethodToFalse() {
    setChoseMethodAdmin(false);
  }

  function changevalueMethodToTrue() {
    setChoseMethodAdmin(true);
  }

  return (
    <Modal
      isOpen={modalIsOpenAdmin}
      onRequestClose={closeModalAdmin}
      contentLabel="Novo Cliente Modal"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-brand-600 rounded-lg 
shadow-lg w-1/3 h-auto z-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-20"
    >
      <button onClick={closeModalAdmin}>
        <X size={15} className="absolute right-7" />
      </button>
      <h2 className="text-2xl mb-4">Editiar Colaborador</h2>
      <form onSubmit={handleSubmit(handleUpdateAdmin)}>
        <div>
          <label htmlFor="cnpjClient">CPF do Colaborador</label>
          <input
            type="text"
            className="text-black mb-6 p-2 border border-gray-300 rounded-lg w-full cursor-not-allowed"
            placeholder="Digite o CPF do Colaborador"
            maxLength={18}
            disabled
            {...register("cpf")}
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
            disabled={isSubmitting}
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
