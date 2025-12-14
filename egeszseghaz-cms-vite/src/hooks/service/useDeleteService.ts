/* eslint-disable prettier/prettier */
import { deleteService } from "@/lib/service/delete_service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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