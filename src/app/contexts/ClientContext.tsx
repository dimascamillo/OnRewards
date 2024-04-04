import { createContext, useContext, useState, ReactNode } from "react";

interface ClientContextData {
  id: string | null;
  name: string | null;
  cnpj: string | null;
  email: string | null;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
  setCNPJ: React.Dispatch<React.SetStateAction<string | null>>;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
}

const ClientContext = createContext<ClientContextData>({
  id: null,
  name: null,
  cnpj: null,
  email: null,
  setId: () => {},
  setName: () => {},
  setCNPJ: () => {},
  setEmail: () => {},
});

interface ClientProviderProps {
  children: ReactNode;
}

export const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [cnpj, setCNPJ] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  return (
    <ClientContext.Provider
      value={{ id, name, cnpj, email, setId, setName, setCNPJ, setEmail }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export function useClient() {
  return useContext(ClientContext);
}
