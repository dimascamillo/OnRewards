import { parseCookies } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface ListClient {
  id: string;
  name: string;
  cnpj: string;
  email: string;
}

interface ListClientsContextType {
  listClients: ListClient[];
  updateClientsList: () => void;
}

interface ListClientsProviderProps {
  children: ReactNode;
}

export const ListClientsContext = createContext({} as ListClientsContextType);

export function ListClientsProvider({ children }: ListClientsProviderProps) {
  const [clients, setClients] = useState<ListClient[]>([]);
  const cookies = parseCookies();
  const authToken = cookies.token;

  async function getAllClientList() {
    const response = await api.get("/allclients", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const listAllClients = response.data;
    setClients(listAllClients);
  }

  const updateClientsList = async () => {
    await getAllClientList();
  };

  useEffect(() => {
    getAllClientList();
  }, []);

  return (
    <ListClientsContext.Provider
      value={{ listClients: clients, updateClientsList }}
    >
      {children}
    </ListClientsContext.Provider>
  );
}
