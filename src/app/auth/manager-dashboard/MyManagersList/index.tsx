import { useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import { parseCookies } from "nookies";

import {
  PencilSimple,
  Trash,
  UserCirclePlus,
} from "@phosphor-icons/react/dist/ssr";

type DataSchemaProducts = {
  id: string;
  name: string;
  cpf: string;
  email: string;
};

export default function MyManagersList() {
  const [managers, setManagers] = useState([]);
  const cookies = parseCookies();
  const authToken = cookies.token;

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await api.get("/getAllManagers", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setManagers(response.data);
      } catch (error) {
        console.error("Erro ao buscar Gerentes:", error);
      }
    };

    fetchManagers();
  }, [authToken]);

  return (
    <>
      <h2 className="my-10">Todos os seus Gerentes</h2>

      <table className="w-full rounded">
        <thead>
          <th className="text-center p-4 bg-brand-400">Nome do Gerente</th>
          <th className="text-center p-4 bg-brand-400">CPF do Gerente</th>
          <th className="text-center p-4 bg-brand-400">E-mail do Gerente</th>
          <th className="text-center p-4 bg-brand-400">Editar Gerente</th>
          <th className="text-center p-4 bg-brand-400">Excluir Gerente</th>
        </thead>

        <tbody>
          {managers.map((manager: DataSchemaProducts, index: number) => (
            <tr
              key={manager.id}
              className="bg-brand-800 transition-all hover:bg-brand-400"
            >
              <td className="p-6 text-center">{manager.name}</td>
              <td className="p-6 text-center">{manager.cpf}</td>
              <td className="p-6 text-center">{manager.email}</td>
              <td className="p-6 text-center">
                <a className="flex justify-center">
                  <PencilSimple size={24} color="#f0f0f0" />
                </a>
              </td>
              <td className="p-6 text-center">
                <a className="flex justify-center">
                  <Trash size={24} color="#f0f0f0" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
