import { createContext, useContext, useState, ReactNode } from "react";

interface AdminContextData {
  id: string | null;
  name: string | null;
  cpf: string | null;
  email: string | null;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
  setCpf: React.Dispatch<React.SetStateAction<string | null>>;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
}

const AdminContext = createContext<AdminContextData>({
  id: null,
  name: null,
  cpf: null,
  email: null,
  setId: () => {},
  setName: () => {},
  setCpf: () => {},
  setEmail: () => {},
});

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [cpf, setCpf] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  return (
    <AdminContext.Provider
      value={{ id, name, cpf, email, setId, setName, setCpf, setEmail }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export function useAdmin() {
  return useContext(AdminContext);
}
