import { createContext, useContext, useState, ReactNode } from "react";

interface ClientIdContextData {
  clientId: string | null;
  setClientId: React.Dispatch<React.SetStateAction<string | null>>;
}

const ClientIdContext = createContext<ClientIdContextData>({
  clientId: null,
  setClientId: () => {},
});

interface ClientIdProviderProps {
  children: ReactNode;
}

export const ClientIdProvider: React.FC<ClientIdProviderProps> = ({
  children,
}) => {
  const [clientId, setClientId] = useState<string | null>(null);

  return (
    <ClientIdContext.Provider value={{ clientId, setClientId }}>
      {children}
    </ClientIdContext.Provider>
  );
};

export function useClientId() {
  return useContext(ClientIdContext);
}
