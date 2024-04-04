// ListClientsContext.tsx

import { createContext, useContext, useState, ReactNode } from "react";
import { dataClientSchema } from "../auth/admin-dashboard/components/client-components/listAllClients";

interface Client {
  id: string;
  name: string;
  cnpj: string;
  email: string;
}

interface ListClientContextData {
  clients: Client[];
  setClients: (clients: Client[]) => void;
}

const ListClientContext = createContext<ListClientContextData>({
  clients: [],
  setClients: () => {},
});

interface ListClientProviderProps {
  children: ReactNode;
}

export const ListClientProvider: React.FC<ListClientProviderProps> = ({
  children,
}) => {
  const [clients, setClients] = useState<Client[]>([]);

  const setValidatedClients = (clients: any[]) => {
    try {
      const validatedClients = clients.map((client) =>
        dataClientSchema.parse(client)
      );
      setClients(validatedClients);
    } catch (error) {
      console.error("Failed to validate clients:", error);
    }
  };

  return (
    <ListClientContext.Provider
      value={{ clients, setClients: setValidatedClients }}
    >
      {children}
    </ListClientContext.Provider>
  );
};

export function useClientList() {
  return useContext(ListClientContext);
}
