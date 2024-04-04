import { ListClientProvider } from "@/app/contexts/ListClientsContext";
import CreateNewClientForm from "./createNewClientForm";
import ListAllClients from "./listAllClients";
import SearchClient from "./searchClient";
import { z } from "zod";

const adminComponentsProps = z.object({
  visibilityAdminComponent: z.string(),
});

type AdminComponentsProps = z.infer<typeof adminComponentsProps>;

export function AdminComponent({
  visibilityAdminComponent,
}: AdminComponentsProps) {
  return (
    <div className={visibilityAdminComponent}>
      <ListClientProvider>
        <CreateNewClientForm />
        <SearchClient />
        <ListAllClients />
      </ListClientProvider>
    </div>
  );
}
