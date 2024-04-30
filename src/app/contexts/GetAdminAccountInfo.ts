import { z } from "zod";

import { api } from "../lib/axios";

const adminAccountInfo = z.object({
  id: z.string(),
  name: z.string(),
});

type AdminAccountInfo = z.infer<typeof adminAccountInfo>;

export async function getInfoAdminAccount({ id, name }: AdminAccountInfo) {
  const response = await api.get(`/admin/${id}`);

  return ({ name } = response);
}
