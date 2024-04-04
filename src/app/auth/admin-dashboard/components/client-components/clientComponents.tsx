import { ListClientProvider } from "@/app/contexts/ListClientsContext";
import CreateNewClientForm from "./createNewClientForm";
import ListAllClients from "./listAllClients";
import SearchClient from "./searchClient";
import { z } from "zod";

const clientComponentsProps = z.object({
  visibilityClientComponent: z.string(),
});

type ClientComponentsProps = z.infer<typeof clientComponentsProps>;

export function ClientComponent({
  visibilityClientComponent,
}: ClientComponentsProps) {
  return (
    <div className={visibilityClientComponent}>
      <ListClientProvider>
        <CreateNewClientForm />
        <SearchClient />
        <ListAllClients />
      </ListClientProvider>
    </div>
  );
}
