/* eslint-disable prettier/prettier */
import { db } from "@/utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, setDoc } from "firebase/firestore";

export function useUpdatePalette() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      await setDoc(doc(db, "settings", "theme"), {
        activeTheme: name,
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["palette"] }),
  });
}
