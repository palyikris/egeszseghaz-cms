/* eslint-disable prettier/prettier */
import { deleteServiceOccurrence } from "@/lib/service/deleteServiceOccurance";
import { useMutation, useQueryClient } from "@tanstack/react-query";


type DeleteOccurrenceVars = {
  serviceId: string;
  scheduleId: string;
  occurrenceId: string;
};

export function useDeleteOccurrence() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      serviceId,
      scheduleId,
      occurrenceId,
    }: DeleteOccurrenceVars) =>
      deleteServiceOccurrence(serviceId, scheduleId, occurrenceId),

    onSuccess: (_, { serviceId }) => {
      qc.refetchQueries({ queryKey: ["service", serviceId] });
      qc.invalidateQueries({ queryKey: ["services"] });
    },
  });
}
