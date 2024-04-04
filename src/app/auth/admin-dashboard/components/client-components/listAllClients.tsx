import { useClientList } from "@/app/contexts/ListClientsContext";
import { api } from "@/app/lib/axios";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { z } from "zod";

import { Trash, PencilSimple } from "@phosphor-icons/react/dist/ssr";
import { toast } from "react-toastify";
import EditClientModal from "./editClientModal";

export const dataClientSchema = z.object({
  id: z.string(),
  name: z.string(),
  cnpj: z.string(),
  email: z.string().email(),
});

type DataClientSchema = z.infer<typeof dataClientSchema>;

function useUpdatedList() {
  const { clients, setClients } = useClientList();
  const cookies = parseCookies();
  const authToken = cookies.token;

  useEffect(() => {
    async function getAllClientList() {
      const response = await api.get("/allclients", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const listAllClients = response.data;
      setClients(listAllClients);
    }

    getAllClientList();
  }, [authToken, setClients]);

  return { clients };
}

export default function ListAllClients() {
  const { clients } = useUpdatedList();

  const [modalIsOpenClient, setModalIsOpenClient] = useState(false);

  async function handleUpdateClient(id: string) {
    const cookies = parseCookies();
    const authToken = cookies.token;

    try {
      await api.delete(`/client/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      toast.success("Cliente excluído com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err: any) {
      console.error(err.message);
    }
  }

  function openModalClient() {
    setModalIsOpenClient(true);
  }

  function closeModalClient() {
    setModalIsOpenClient(false);
  }

  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="bg-brand-400">
          <tr>
            <th className="p-3">Nome da Empresa</th>
            <th className="p-3">CNPJ</th>
            <th className="p-3">E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {clients.map((client) => {
            return (
              <tr className="bg-brand-600" key={client.id}>
                <td className="p-4">{client.name}</td>
                <td className="p-4">{client.cnpj}</td>
                <td className="p-4">{client.email}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleUpdateClient(client.id)}
                    className="text-red-600 bg-white rounded-md w-8 h-8 text-center transition-all hover:bg-red-600 hover:text-white"
                  >
                    <Trash size={25} className=" m-auto" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
