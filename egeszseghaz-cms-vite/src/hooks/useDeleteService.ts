/* eslint-disable prettier/prettier */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteService } from "@/lib/delete_service";

export function useDeleteService() {

  const qc = useQueryClient();

  return useMutation({
    mutationKey: ["deleteService"],
    mutationFn: async (serviceId: string) => {
      await deleteService(serviceId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["services"] });
    },
  })
}