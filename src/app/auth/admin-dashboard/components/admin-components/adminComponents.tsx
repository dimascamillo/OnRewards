import { z } from "zod";
import CreateNewAdminForm from "./createNewAdminForm";

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
      </>
    </div>
  );
}
