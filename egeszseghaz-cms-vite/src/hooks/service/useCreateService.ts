/* eslint-disable prettier/prettier */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createService } from "@/lib/create_service";

type CreateVariables = {
  payload: any;
  id?: string;
};

export function useCreateService() {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ["createService"],
    mutationFn: async ({ payload, id }: CreateVariables) => {
      const created = await createService(payload, id);
      return created;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["services"] });
      qc.invalidateQueries({ queryKey: ["newService"] });
    },
  });
}
