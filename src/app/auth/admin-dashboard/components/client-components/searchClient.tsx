import useFormatCNPJ from "@/app/hooks/useFormatCnpj";
import { api } from "@/app/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseCookies } from "nookies";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import EditClientModal from "./editClientModal";
import { EditClientFormSchema } from "./editClientModal";
import useMensageAlert from "@/app/hooks/useMensageAlert";
import { X } from "@phosphor-icons/react/dist/ssr";

const consultingClientFormSchema = z.object({
  context: z.string(),
});

type ConsultingClientFormSchema = z.infer<typeof consultingClientFormSchema>;

export default function SearchClient() {
  const formatCNPJ = useFormatCNPJ();
  const showMessage = useMensageAlert();

  const [modalIsOpenClient, setModalIsOpenClient] = useState(false);
  const [infoClient, setInfoClient] = useState<EditClientFormSchema | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ConsultingClientFormSchema>({
    resolver: zodResolver(consultingClientFormSchema),
  });

  async function handleCreateClient(data: ConsultingClientFormSchema) {
    const { context } = data;

    const cookies = parseCookies();
    const authToken = cookies.token;

    try {
      const response = await api.get("/consulting/client", {
        params: {
          search: context,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setInfoClient(response.data);
      openModalClient();

      reset();
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        showMessage({ type: "error", text: "CNPJ não encontrado." });
        return;
      }
      console.error(errors);
    }
  }

  function openModalClient() {
    setModalIsOpenClient(true);
  }

  function closeModalClient() {
    setModalIsOpenClient(false);
  }

  function handleResetSearcgCNPJ() {
    reset();
  }
  return (
    <>
      <form onSubmit={handleSubmit(handleCreateClient)}>
        <div className="flex flex-col my-10">
          <label className="mb-3" htmlFor="">
            Editar Cliente
          </label>
          <div className="flex justify-start">
            <div className="relative">
              <input
                className="text-black w-full h-11 px-3 rounded-s-sm"
                type="text"
                placeholder="Digite apenas números"
                {...register("context")}
                onChange={(e) => {
                  const formattedCNPJ = formatCNPJ(e.target.value);
                  setValue("context", formattedCNPJ);
                }}
                maxLength={18}
              />
              <button type="button">
                <X
                  onClick={handleResetSearcgCNPJ}
                  className="text-black absolute right-2 top-4"
                  size={15}
                />
              </button>
            </div>
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
        modalIsOpenClient={modalIsOpenClient}
        closeModalClient={closeModalClient}
        getcnpj={infoClient?.cnpj ?? ""}
        getname={infoClient?.name ?? ""}
        getemail={infoClient?.email ?? ""}
      />
    </>
  );
}
