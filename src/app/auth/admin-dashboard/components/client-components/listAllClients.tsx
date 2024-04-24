import { api } from "@/app/lib/axios";
import { parseCookies } from "nookies";
import { useContext, useState } from "react";
import { z } from "zod";

import { PencilSimpleLine, Trash } from "@phosphor-icons/react/dist/ssr";
import { toast } from "react-toastify";
import EditClientModal from "./editClientModal";
import { ListClientsContext } from "@/app/contexts/ListClientsContext";

export const dataClientSchema = z.object({
  id: z.string(),
  name: z.string(),
  cnpj: z.string(),
  email: z.string().email(),
});

type DataClientSchema = z.infer<typeof dataClientSchema>;

export default function ListAllClients() {
  const [modalIsOpenClient, setModalIsOpenClient] = useState(false);
  const [infoClient, setInfoClient] = useState<DataClientSchema>();

  const { listClients, updateClientsList } = useContext(ListClientsContext);

  const openModalClient = (client: DataClientSchema) => {
    setInfoClient(client);
    setModalIsOpenClient(true);
  };

  const closeModalClient = () => {
    setModalIsOpenClient(false);
  };

  async function handleDeleteClient(id: string) {
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
      updateClientsList();
    } catch (err: any) {
      console.error(err.message);
    }
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
          {listClients.map((client) => {
            return (
              <tr className="bg-brand-600" key={client.id}>
                <td className="p-4">{client.name}</td>
                <td className="p-4">{client.cnpj}</td>
                <td className="p-4">{client.email}</td>
                <td className="p-4">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => openModalClient(client)}
                      className="text-blue-600 bg-white rounded-md w-8 h-8 text-center transition-all hover:bg-blue-600 hover:text-white"
                    >
                      <PencilSimpleLine size={25} className=" m-auto" />
                    </button>

                    <button
                      onClick={() => handleDeleteClient(client.id)}
                      className="text-red-600 bg-white rounded-md w-8 h-8 text-center transition-all hover:bg-red-600 hover:text-white"
                    >
                      <Trash size={25} className=" m-auto" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <EditClientModal
        modalIsOpenClient={modalIsOpenClient}
        closeModalClient={closeModalClient}
        getcnpj={infoClient?.cnpj ?? ""}
        getname={infoClient?.name ?? ""}
        getemail={infoClient?.email ?? ""}
      />
    </div>
  );
}
