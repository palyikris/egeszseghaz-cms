/* eslint-disable prettier/prettier */
import { createService } from "@/lib/service/create_service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
