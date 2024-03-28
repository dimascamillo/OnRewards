import { api } from "@/app/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const consultingClientFormSchema = z.object({
  context: z.string(),
});

type ConsultingClientFormSchema = z.infer<typeof consultingClientFormSchema>;

export default function SearchClient() {
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

    try {
      await api.get("/consulting/client", {
        params: {
          context,
        },
      });

      reset();
    } catch (err: any) {
      console.error(err.message);
    }
  }
  return (
    <form onSubmit={handleSubmit(handleCreateClient)}>
      <div className="flex flex-col my-10">
        <label className="mb-3" htmlFor="">
          Digite o CNPJ ou Nome do Cliente
        </label>
        <div>
          <input
            className="text-black w-1/4 h-11 px-3 rounded-s-sm"
            type="text"
            placeholder="Digite apenas números"
            {...register("context")}
          />
          <button
            className="bg-yellow-brand-400 text-black w-32 h-11 hover:bg-yellow-brand-500 transition-all rounded-e-sm"
            type="submit"
          >
            Consultar
          </button>
        </div>
      </div>
    </form>
  );
}
