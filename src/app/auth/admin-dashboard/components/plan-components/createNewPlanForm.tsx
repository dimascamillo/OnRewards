import { api } from "@/app/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import Modal from "react-modal";

import { X } from "@phosphor-icons/react/dist/ssr";
import { parseCookies } from "nookies";

type NewPlanProps = {
  closeModalPlan: () => void;
  modalIsOpenPlan: boolean;
};

const newPlanFormSchema = z.object({
  name: z.string(),
  amoutCreateProduct: z.number(),
  amountCreateManager: z.number(),
  validityPlan: z.number(),
});

type NewPlanFormSchema = z.infer<typeof newPlanFormSchema>;

export default function CreateNewPlanForm({
  closeModalPlan,
  modalIsOpenPlan,
}: NewPlanProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewPlanFormSchema>({
    resolver: zodResolver(newPlanFormSchema),
  });

  async function handleCreatePlan(data: NewPlanFormSchema) {
    const { name, amountCreateManager, amoutCreateProduct, validityPlan } =
      data;

    const cookies = parseCookies();
    const authToken = cookies.token;

    try {
      await api.post(
        "/plans",
        {
          name,
          amountCreateManager,
          amoutCreateProduct,
          validityPlan,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      toast.success("Plano criado com sucesso!", {
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
      isOpen={modalIsOpenPlan}
      onRequestClose={closeModalPlan}
      contentLabel="Novo Plano Modal"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-brand-600 rounded-lg 
  shadow-lg w-1/3 h-auto z-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-20"
    >
      <button onClick={closeModalPlan}>
        <X size={15} className="absolute right-7" />
      </button>
      <h2 className="text-2xl mb-4">Cadastre um Novo Plano</h2>
      <form onSubmit={handleSubmit(handleCreatePlan)}>
        <div>
          <label htmlFor="name">Nome do Plano</label>
          <input
            type="text"
            className="mb-6 p-2 border border-gray-300 text-black rounded-lg w-full"
            placeholder="Digite o nome do Gerente"
            {...register("name")}
          />
        </div>

        <div>
          <label htmlFor="amoutCreateProduct">
            Quantos Produtos o Cliente pode Criar
          </label>
          <input
            type="number"
            className="mb-6 p-2 border border-gray-300 text-black rounded-lg w-full"
            placeholder="Digite a quantidade de Produtos"
            {...register("amoutCreateProduct", {
              valueAsNumber: true,
            })}
          />
        </div>

        <div>
          <label htmlFor="amountCreateManager">
            Quantos Gerente o Cliente pode Criar
          </label>
          <input
            type="number"
            className="mb-6 p-2 border border-gray-300 text-black rounded-lg w-full"
            placeholder="Digite a quantidade de Gerentes"
            {...register("amountCreateManager", {
              valueAsNumber: true,
            })}
          />
        </div>

        <div>
          <label htmlFor="validityPlan">Validade do Plano</label>
          <input
            type="number"
            className="mb-6 p-2 border border-gray-300 text-black rounded-lg w-full"
            placeholder="Digite a quantidade de Gerentes"
            {...register("validityPlan", {
              valueAsNumber: true,
            })}
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
