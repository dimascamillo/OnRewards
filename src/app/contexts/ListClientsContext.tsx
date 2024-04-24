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

  useEffect(() => {
    getAllClientList();
  }, []);

  return (
    <ListClientsContext.Provider value={{ listClients: clients }}>
      {children}
    </ListClientsContext.Provider>
  );
}
