/* eslint-disable prettier/prettier */
import { Service } from "@/types/services";
import { db } from "@/utils/firebase";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";


export function useUpdateService() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Service>;
    }) => {
      await updateDoc(doc(db, "services", id), data);
    },
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["service", id] });
      qc.invalidateQueries({ queryKey: ["services"] });
    },
  });
}
