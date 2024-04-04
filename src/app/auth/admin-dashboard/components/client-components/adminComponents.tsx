import { ListClientProvider } from "@/app/contexts/ListClientsContext";
import CreateNewClientForm from "./createNewClientForm";
import ListAllClients from "./listAllClients";
import SearchClient from "./searchClient";

export function AdminComponent() {
  return (
    <div>
      <ListClientProvider>
        <CreateNewClientForm />
        <SearchClient />
        <ListAllClients />
      </ListClientProvider>
    </div>
  );
}
