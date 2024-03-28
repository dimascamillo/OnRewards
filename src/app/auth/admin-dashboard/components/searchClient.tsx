import useFormatCNPJ from "@/app/hook/useFormatCnpj";
import { api } from "@/app/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseCookies } from "nookies";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const consultingClientFormSchema = z.object({
  context: z.string(),
});

type ConsultingClientFormSchema = z.infer<typeof consultingClientFormSchema>;

export default function SearchClient() {
  const formatCNPJ = useFormatCNPJ();

  const [clientNotFound, setClientNotFound] = useState("");

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

      setClientNotFound("");

      reset();
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setClientNotFound("CNPJ não encontrado.");
      }
      console.error(err.message);
    }
  }
  return (
    <form onSubmit={handleSubmit(handleCreateClient)}>
      <div className="flex flex-col my-10">
        <label className="mb-3" htmlFor="">
          Digite o CNPJ do Cliente
        </label>
        <div>
          <input
            className="text-black w-1/4 h-11 px-3 rounded-s-sm"
            type="text"
            placeholder="Digite apenas números"
            {...register("context")}
            onChange={(e) => {
              const formattedCNPJ = formatCNPJ(e.target.value);
              setValue("context", formattedCNPJ);
            }}
          />
          <button
            className="bg-yellow-brand-400 text-black w-32 h-11 hover:bg-yellow-brand-500 transition-all rounded-e-sm"
            type="submit"
          >
            Consultar
          </button>
        </div>
      </div>
      <span className="text-red-600 font-semibold">{clientNotFound}</span>
    </form>
  );
}
