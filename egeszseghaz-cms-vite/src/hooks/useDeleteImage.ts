/* eslint-disable prettier/prettier */
import { deleteImageFromFirebase } from "@/lib/media";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteVariables = {
  name: string;
};

export function useDeleteImage() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, DeleteVariables>({
    mutationKey: ["delete-image"],
    mutationFn: async ({ name }: DeleteVariables) => {
      await deleteImageFromFirebase(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
    onError: (err) => {
      console.error("Error deleting image:", err);
    },
  });
}
