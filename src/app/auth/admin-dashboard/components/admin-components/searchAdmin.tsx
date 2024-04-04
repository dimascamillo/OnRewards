import { api } from "@/app/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseCookies } from "nookies";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import EditClientModal from "./editAdminModal";
import useMensageAlert from "@/app/hooks/useMensageAlert";
import useFormatCPF from "@/app/hooks/useFormatCpf";

const consultingAdminFormSchema = z.object({
  context: z.string(),
});

type ConsultingAdminFormSchema = z.infer<typeof consultingAdminFormSchema>;

export default function SearchAdmin() {
  const formatCPF = useFormatCPF();
  const showMessage = useMensageAlert();

  const [modalIsOpenAdmin, setModalIsOpenAdmin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ConsultingAdminFormSchema>({
    resolver: zodResolver(consultingAdminFormSchema),
  });

  async function handleCreateClient(data: ConsultingAdminFormSchema) {
    const { context } = data;

    const cookies = parseCookies();
    const authToken = cookies.token;

    try {
      await api.get("/consulting/admin", {
        params: {
          search: context,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      openModalAdmin();

      reset();
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        showMessage({ type: "error", text: "CPF não encontrado." });
        return;
      }
      console.error(errors);
    }
  }

  function openModalAdmin() {
    setModalIsOpenAdmin(true);
  }

  function closeModalAdmin() {
    setModalIsOpenAdmin(false);
  }
  return (
    <>
      <form onSubmit={handleSubmit(handleCreateClient)}>
        <div className="flex flex-col my-10">
          <label className="mb-3" htmlFor="">
            Editar Cliente
          </label>
          <div>
            <input
              className="text-black w-1/4 h-11 px-3 rounded-s-sm"
              type="text"
              placeholder="Digite apenas números"
              {...register("context")}
              onChange={(e) => {
                const formattedCPF = formatCPF(e.target.value);
                setValue("context", formattedCPF);
              }}
              maxLength={18}
            />
            <button
              disabled={isSubmitting}
              className="bg-yellow-brand-400 text-black w-32 h-11 hover:bg-yellow-brand-500 transition-all rounded-e-sm"
              type="submit"
            >
              Consultar
            </button>
          </div>
        </div>
      </form>

      <EditClientModal
        modalIsOpenAdmin={modalIsOpenAdmin}
        closeModalAdmin={closeModalAdmin}
        getcnpj={infoClient?.cnpj ?? ""}
        getname={infoClient?.name ?? ""}
        getemail={infoClient?.email ?? ""}
      />
    </>
  );
}
