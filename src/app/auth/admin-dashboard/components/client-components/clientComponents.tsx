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
      <>
        <CreateNewClientForm />
        <SearchClient />
        <ListAllClients />
      </>
    </div>
  );
}
