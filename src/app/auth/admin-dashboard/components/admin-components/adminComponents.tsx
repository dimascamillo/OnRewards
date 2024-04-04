import { z } from "zod";
import CreateNewAdminForm from "./createNewAdminForm";

import SearchAdmin from "./searchAdmin";
import ListAllClients from "./listAllAdmin";

const adminComponentsProps = z.object({
  visibilityAdminComponent: z.string(),
});

type AdminComponentsProps = z.infer<typeof adminComponentsProps>;

export function AdminComponent({
  visibilityAdminComponent,
}: AdminComponentsProps) {
  return (
    <div className={visibilityAdminComponent}>
      <>
        <CreateNewAdminForm />
        {/* <ListAllClients />
        <SearchAdmin /> */}
      </>
    </div>
  );
}
